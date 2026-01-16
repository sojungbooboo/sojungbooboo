import { useState } from "react"
import "./index.scss"

// 더미 이미지 데이터
const images = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80",
]

export const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="gallery">
      <h2>사진</h2>
      <div className="content">
        <div className="gallery-container">
          <button className="nav-button prev" onClick={handlePrev}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="gallery-viewport">
            <div
              className="gallery-slider"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={img} alt={`Gallery ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <button className="nav-button next" onClick={handleNext}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="gallery-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`indicator ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

