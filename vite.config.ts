import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { createHtmlPlugin } from "vite-plugin-html"

const distFolder = "docs"
// GitHub Pages 배포 시: const base = "/sojungbooboo/"
// 로컬 개발 시: const base = "/"
const base = "/sojungbooboo/"

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
        },
      },
    }),
  ],
  server: { port: 3000 },
  build: { outDir: distFolder },
  base,
})

