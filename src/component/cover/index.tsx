import { useState, useEffect } from "react"
import "./index.scss"

export const Cover = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [animatedChars, setAnimatedChars] = useState<string[]>([])

  useEffect(() => {
    // 글자별 애니메이션 시작
    const text = ["We", "Got", "Married!"]
    const allChars = text.join(" ").split("")
    let currentIndex = 0

    const animateChars = () => {
      if (currentIndex < allChars.length) {
        setAnimatedChars((prev) => [...prev, allChars[currentIndex]])
        currentIndex++
        setTimeout(animateChars, 100) // 각 글자마다 100ms 딜레이
      } else {
        // 마지막 글자 애니메이션 끝나고 1.5초 더 기다림 (더 느리게)
        setTimeout(() => {
          setShowIntro(false)
        }, 1500)
      }
    }

    // 약간의 딜레이 후 애니메이션 시작
    setTimeout(animateChars, 200)

    return () => {}
  }, [])

  const textLines = ["We", "Got", "Married!"]

  return (
    <div className="cover">
      {/* 인트로 오버레이 */}
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-text">
            {textLines.map((line, lineIndex) => (
              <div key={lineIndex} className={`brush-line line-${lineIndex}`}>
                {line.split("").map((char, charIndex) => {
                  const globalIndex = textLines
                    .slice(0, lineIndex)
                    .join(" ")
                    .split("").length + charIndex
                  const isVisible = animatedChars.length > globalIndex
                  const isFirstChar = charIndex === 0
                  return (
                    <span
                      key={charIndex}
                      className={`brush-char ${isVisible ? "visible" : ""} ${isFirstChar ? "first-char" : ""}`}
                      style={{
                        transitionDelay: `${globalIndex * 0.1}s`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  )
                })}
              </div>
            ))}
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

