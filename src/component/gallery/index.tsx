import { useState, useEffect, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import "./index.scss"

// 실제 이미지 데이터 (12장)
const baseUrl = import.meta.env.BASE_URL
const imageNames = [
  "2.jpeg",
  "3.jpeg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
]

// 이미지 경로 생성 함수 (WebP 우선, 원본 fallback)
const getImageSrc = (imageName: string) => {
  const baseName = imageName.replace(/\.(jpg|jpeg)$/i, "")
  return {
    webp: `${baseUrl}images/${baseName}.webp`,
    original: `${baseUrl}images/${imageName}`,
  }
}

const images = imageNames.map(getImageSrc)

// 이미지 프리패칭 함수 (WebP 우선, 실패 시 원본)
const prefetchImage = (imageSrc: { webp: string; original: string }): Promise<void> => {
  return new Promise((resolve) => {
    // WebP 지원 여부 확인
    const webpSupported = document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0

    const img = new Image()
    let loaded = false

    const onLoad = () => {
      if (!loaded) {
        loaded = true
        resolve()
      }
    }

    const onError = () => {
      if (!loaded) {
        // WebP 실패 시 원본 이미지 로드
        img.src = imageSrc.original
      }
    }

    img.onload = onLoad
    img.onerror = onError

    // WebP 지원 시 WebP 로드, 미지원 시 원본 로드
    img.src = webpSupported ? imageSrc.webp : imageSrc.original
  })
}

export const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)

  // 이미지 프리패칭: 현재 인덱스 변경 시 다음/이전 이미지 미리 로드
  useEffect(() => {
    // 다음 이미지 인덱스 (순환 구조)
    const nextIndex = (currentIndex + 1) % images.length
    // 이전 이미지 인덱스 (순환 구조)
    const prevIndex = (currentIndex - 1 + images.length) % images.length

    // 다음 이미지 프리패칭
    prefetchImage(images[nextIndex]).catch(() => {
      // 에러 무시 (이미지 로드 실패해도 계속 진행)
    })

    // 이전 이미지 프리패칭
    prefetchImage(images[prevIndex]).catch(() => {
      // 에러 무시
    })
  }, [currentIndex])

  // Fullscreen 인덱스 변경 시에도 프리패칭
  useEffect(() => {
    if (!isFullscreen) return

    const nextIndex = (fullscreenIndex + 1) % images.length
    const prevIndex = (fullscreenIndex - 1 + images.length) % images.length

    prefetchImage(images[nextIndex]).catch(() => {})
    prefetchImage(images[prevIndex]).catch(() => {})
  }, [fullscreenIndex, isFullscreen])

  // 초기 로드 시 전체 이미지 프리패칭 (용량이 크더라도 첫 방문 시 한 번만 로드)
  useEffect(() => {
    images.forEach((src) => {
      prefetchImage(src).catch(() => {
        // 개별 이미지 로드 실패는 무시 (나머지 이미지 로드는 계속 진행)
      })
    })
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [])

  const handleImageClick = useCallback((index: number) => {
    setFullscreenIndex(index)
    setIsFullscreen(true)
  }, [])

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false)
  }, [])

  const handleFullscreenPrev = useCallback(() => {
    setFullscreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [])

  const handleFullscreenNext = useCallback(() => {
    setFullscreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [])

  // 렌더링할 이미지 인덱스 계산 (메모이제이션)
  const visibleImageIndices = useMemo(() => {
    const prev = (currentIndex - 1 + images.length) % images.length
    const next = (currentIndex + 1) % images.length
    return { prev, current: currentIndex, next }
  }, [currentIndex])

  useEffect(() => {
    if (!isFullscreen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseFullscreen()
      }
    }

    document.addEventListener("keydown", handleEscape)
    // 전체보기 팝업이 열린 동안에는 바깥 페이지 스크롤 고정
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    document.body.classList.add("modal-open")
    document.documentElement.classList.add("modal-open")

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
      document.body.classList.remove("modal-open")
      document.documentElement.classList.remove("modal-open")
    }
  }, [isFullscreen, handleCloseFullscreen])

  return (
    <>
      <div className="gallery">
        <h2 className="english-title">Gallery</h2>
        <p className="gallery-hint">사진을 클릭하시면 전체 화면 보기가 가능합니다.</p>
        <div className="content">
          <div className="gallery-container">
            <div className="gallery-viewport">
              {[visibleImageIndices.prev, visibleImageIndices.current, visibleImageIndices.next].map((idx) => {
                const isPrev = idx === visibleImageIndices.prev
                const isNext = idx === visibleImageIndices.next
                const isCurrent = idx === visibleImageIndices.current

                return (
                  <div
                    key={idx}
                    className={`gallery-item ${isCurrent ? "current" : ""} ${isPrev ? "prev" : ""} ${isNext ? "next" : ""}`}
                    onClick={() => isCurrent && handleImageClick(idx)}
                  >
                    <picture>
                      <source srcSet={images[idx].webp} type="image/webp" />
                      <img src={images[idx].original} alt={`Gallery ${idx + 1}`} />
                    </picture>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="gallery-controls">
            <button className="nav-button prev" onClick={handlePrev}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <span className="gallery-counter">
              {currentIndex + 1} / {images.length}
            </span>
            <button className="nav-button next" onClick={handleNext}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {isFullscreen &&
        createPortal(
          <div className="fullscreen-modal" onClick={handleCloseFullscreen}>
            <button className="close-button" onClick={handleCloseFullscreen}>
              <i className="fas fa-times"></i>
            </button>
            <div className="fullscreen-image-container" onClick={(e) => e.stopPropagation()}>
              <picture>
                <source srcSet={images[fullscreenIndex].webp} type="image/webp" />
                <img src={images[fullscreenIndex].original} alt={`Gallery ${fullscreenIndex + 1}`} />
              </picture>
              <button className="fullscreen-nav prev" onClick={handleFullscreenPrev}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="fullscreen-nav next" onClick={handleFullscreenNext}>
                <i className="fas fa-chevron-right"></i>
              </button>
              <div className="fullscreen-counter">
                {fullscreenIndex + 1} / {images.length}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
