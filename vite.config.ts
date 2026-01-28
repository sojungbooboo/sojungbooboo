import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { createHtmlPlugin } from "vite-plugin-html"
import sharp from "sharp"
import { existsSync } from "fs"
import { join } from "path"
import { fileURLToPath } from "url"

const distFolder = "docs"
// GitHub Pages 배포 시: const base = "/sojungbooboo/"
// 로컬 개발 시: const base = "/"
const base = "/sojungbooboo/"

// 이미지를 정사각형으로 자르는 플러그인
const imageCropPlugin = () => {
  return {
    name: "image-crop",
    async writeBundle() {
      const sourceImage = join(process.cwd(), "public", "images", "1.jpeg")
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

        // 정사각형 크기 계산 (짧은 쪽 기준)
        const size = Math.min(width, height)

        // 중앙에서 정사각형으로 자르기
        await sharp(sourceImage)
          .resize(size, size, {
            fit: "cover",
            position: "center",
          })
          .resize(1200, 1200, {
            fit: "cover",
          })
          .jpeg({ quality: 90 })
          .toFile(outputImage)

        console.log(`✅ Preview image created: ${outputImage} (${size}x${size} → 1200x1200)`)
      } catch (error) {
        console.error("❌ Error creating preview image:", error)
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
          BRIDE_NAME: "SOHYUN",
          DESCRIPTION: "2026년 3월 28일 토요일 오전 11시 30분 해군호텔 W웨딩홀",
          KAKAO_MAP_API_KEY: "33ca32716a75107b1da61cc1b76a0f7a",
          BASE_URL: base,
        },
      },
    }),
    imageCropPlugin(),
  ],
  server: { port: 3000 },
  build: { outDir: distFolder },
  base,
})

