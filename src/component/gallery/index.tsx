import { useState, useEffect } from "react"
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

export const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageClick = (index: number) => {
    setFullscreenIndex(index)
    setIsFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
  }

  const handleFullscreenPrev = () => {
    setFullscreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleFullscreenNext = () => {
    setFullscreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

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
  }, [isFullscreen])

  return (
    <>
      <div className="gallery">
        <h2 className="english-title">Gallery</h2>
        <p className="gallery-hint">사진을 클릭하시면 전체 화면 보기가 가능합니다.</p>
        <div className="content">
          <div className="gallery-container">
            <div className="gallery-viewport">
              {images.map((img, idx) => {
                const isPrev = idx === (currentIndex - 1 + images.length) % images.length
                const isNext = idx === (currentIndex + 1) % images.length
                const isCurrent = idx === currentIndex

                // 현재, 이전, 다음 이미지만 렌더링
                if (!isCurrent && !isPrev && !isNext) {
                  return null
                }

                return (
                  <div
                    key={idx}
                    className={`gallery-item ${isCurrent ? "current" : ""} ${isPrev ? "prev" : ""} ${isNext ? "next" : ""}`}
                    onClick={() => isCurrent && handleImageClick(idx)}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} />
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

