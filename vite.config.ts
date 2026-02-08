import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { createHtmlPlugin } from "vite-plugin-html"
import sharp from "sharp"
import { existsSync, readdirSync, statSync } from "fs"
import { join, extname, basename } from "path"

const distFolder = "docs"
// GitHub Pages 배포 시: const base = "/sojungbooboo/"
// 로컬 개발 시: const base = "/"
const base = "/sojungbooboo/"
const absoluteBaseUrl = "https://sojungbooboo.github.io/sojungbooboo/"

// 이미지를 정사각형으로 자르는 플러그인
const imageCropPlugin = () => {
  return {
    name: "image-crop",
    async writeBundle() {
      const sourceImage = join(process.cwd(), "public", "images", "10.jpg")
      const outputImage = join(process.cwd(), distFolder, "preview_image.jpg")

      if (!existsSync(sourceImage)) {
        console.warn(`⚠️  Source image not found: ${sourceImage}`)
        return
      }

      try {
        // 이미지 메타데이터 가져오기
        const metadata = await sharp(sourceImage).metadata()
        const { width, height } = metadata

        if (!width || !height) {
          console.warn("⚠️  Could not read image dimensions")
          return
        }

        // 4:3(가로:세로) 가로 비율로, 아래쪽 기준으로 크롭
        await sharp(sourceImage)
          .resize(1600, 1200, {
            fit: "cover",
            position: "bottom", // 아래쪽 기준으로 얼굴이 잘리지 않도록
          })
          .jpeg({ quality: 90 })
          .toFile(outputImage)

        console.log(`✅ Preview image created: ${outputImage} → 1600x1200 (4:3 aspect ratio, bottom aligned)`)
      } catch (error) {
        console.error("❌ Error creating preview image:", error)
      }
    },
  }
}

// 이미지를 WebP로 변환하는 플러그인
const webpConvertPlugin = () => {
  return {
    name: "webp-convert",
    async writeBundle() {
      const imagesDir = join(process.cwd(), "public", "images")
      const outputDir = join(process.cwd(), distFolder, "images")

      if (!existsSync(imagesDir)) {
        console.warn(`⚠️  Images directory not found: ${imagesDir}`)
        return
      }

      try {
        const files = readdirSync(imagesDir)
        const imageFiles = files.filter(
          (file) => [".jpg", ".jpeg", ".png"].includes(extname(file).toLowerCase())
        )

        let convertedCount = 0
        for (const file of imageFiles) {
          const inputPath = join(imagesDir, file)
          const fileName = basename(file, extname(file))
          const outputPath = join(outputDir, `${fileName}.webp`)

          try {
            await sharp(inputPath)
              .webp({ quality: 85 })
              .toFile(outputPath)
            convertedCount++
          } catch (error) {
            console.warn(`⚠️  Failed to convert ${file}:`, error)
          }
        }

        if (convertedCount > 0) {
          console.log(`✅ Converted ${convertedCount} images to WebP format`)
        }
      } catch (error) {
        console.error("❌ Error converting images to WebP:", error)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          GROOM_NAME: "JUNGHWA",
          BRIDE_NAME: "SOHYEON",
          DESCRIPTION: "2026년 3월 28일 토요일 오전 11시 30분 해군호텔 W웨딩홀",
          KAKAO_MAP_API_KEY: "33ca32716a75107b1da61cc1b76a0f7a",
          BASE_URL: base,
          ABSOLUTE_BASE_URL: absoluteBaseUrl,
          PREVIEW_IMAGE_VERSION: Date.now().toString(), // 캐시 무효화를 위한 버전 번호
        },
      },
    }),
    imageCropPlugin(),
    webpConvertPlugin(),
  ],
  server: { port: 3000 },
  build: { outDir: distFolder },
  base,
})

