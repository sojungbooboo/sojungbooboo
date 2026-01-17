import { useState, useEffect } from "react"
import "./index.scss"

export const Cover = () => {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // 3초 후 인트로 오버레이 사라지기
    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="cover">
      {/* 인트로 오버레이 */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-text">
            <span className="brush-text">We get Married!</span>
          </div>
        </div>
      )}
      <div className="cover-image">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" 
          alt="Wedding Cover" 
        />
        <div className="overlay" />
      </div>
      <div className="cover-content">
        <div className="names">
          <span className="groom-name">JUNGHWA</span>
          <span className="divider">&</span>
          <span className="bride-name">SOHYUN</span>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="arrow">↓</div>
      </div>
    </div>
  )
}

