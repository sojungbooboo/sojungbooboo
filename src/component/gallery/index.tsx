import { useState, useEffect, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import "./index.scss"

// 실제 이미지 데이터 (13장)
const baseUrl = import.meta.env.BASE_URL
const images = [
  `${baseUrl}images/1.jpeg`,
  `${baseUrl}images/2.jpeg`,
  `${baseUrl}images/3.jpeg`,
  `${baseUrl}images/4.jpg`,
  `${baseUrl}images/5.jpg`,
  `${baseUrl}images/6.jpg`,
  `${baseUrl}images/7.jpg`,
  `${baseUrl}images/8.jpg`,
  `${baseUrl}images/9.jpg`,
  `${baseUrl}images/10.jpg`,
  `${baseUrl}images/11.jpg`,
  `${baseUrl}images/12.jpg`,
  `${baseUrl}images/13.jpg`,
]

// 이미지 프리패칭 함수
const prefetchImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
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

  // 초기 로드 시 첫 번째 이미지 주변 프리패칭
  useEffect(() => {
    const nextIndex = 1 % images.length
    const prevIndex = (images.length - 1) % images.length

    prefetchImage(images[nextIndex]).catch(() => {})
    prefetchImage(images[prevIndex]).catch(() => {})
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
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
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
                    <img src={images[idx]} alt={`Gallery ${idx + 1}`} loading="lazy" />
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
              <img src={images[fullscreenIndex]} alt={`Gallery ${fullscreenIndex + 1}`} />
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
