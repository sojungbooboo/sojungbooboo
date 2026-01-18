import { useState, useEffect } from "react"
import "./index.scss"

export const Cover = () => {
  /**
   * INTRO(We Got Married!) 임시 비활성화용 토글
   * - true로 바꾸면 기존 인트로/타이밍 로직이 다시 활성화됩니다.
   */
  const ENABLE_INTRO = false

  const [showIntro, setShowIntro] = useState(ENABLE_INTRO)
  const [showContent, setShowContent] = useState(false)
  const [animatedChars, setAnimatedChars] = useState<string[]>([])

  useEffect(() => {
    // INTRO 비활성화: Junghwa & Sohyun을 0.5초 후 바로 노출
    // (기존 "인트로 끝난 뒤 등장" 딜레이 로직은 임시로 우회)
    if (!ENABLE_INTRO) {
      const t = window.setTimeout(() => {
        setShowContent(true)
      }, 500)
      return () => window.clearTimeout(t)
    }

    // 글자별 애니메이션 시작
    const text = ["We", "Got", "Married"]
    const allChars = text.join(" ").split("")
    let currentIndex = 0

    const animateChars = () => {
      if (currentIndex < allChars.length) {
        setAnimatedChars((prev) => [...prev, allChars[currentIndex]])
        currentIndex++
        setTimeout(animateChars, 100) // 각 글자마다 100ms 딜레이
      } else {
        // "Married"까지 나타난 후 0.5초 딜레이 후 "!" 표시
        setTimeout(() => {
          setAnimatedChars((prev) => [...prev, "!"])
          // "!" 표시 후 1.5초 더 기다림
          setTimeout(() => {
            setShowIntro(false)
            // 인트로가 사라진 후 cover-content 표시
            setTimeout(() => {
              setShowContent(true)
            }, 200) // fadeOut 애니메이션 완료 후 약간의 딜레이
          }, 1500)
        }, 500) // "!" 딜레이 0.5초
      }
    }

    // 약간의 딜레이 후 애니메이션 시작
    setTimeout(animateChars, 200)

    return () => {}
  }, [ENABLE_INTRO])

  const textLines = ["We", "Got", "Married!"]

  return (
    <div className="cover">
      {/* INTRO(We Got Married!) 임시 주석처리: ENABLE_INTRO를 true로 바꾸면 다시 보입니다. */}
      {ENABLE_INTRO && showIntro && (
        <div className="intro-overlay">
          <div className="intro-text">
            {textLines.map((line, lineIndex) => {
              // 이전 라인들의 글자 수 계산
              const prevCharsCount = textLines
                .slice(0, lineIndex)
                .join(" ")
                .split("").length
              
              // "Married!" 라인인 경우 "!"를 별도 처리
              const isMarriedLine = line === "Married!"
              const displayLine = isMarriedLine ? "Married" : line
              const exclamationMark = isMarriedLine ? "!" : null
              
              return (
                <div key={lineIndex} className={`brush-line line-${lineIndex}`}>
                  {displayLine.split("").map((char, charIndex) => {
                    const globalIndex = prevCharsCount + charIndex
                    const isVisible = animatedChars.length > globalIndex
                    const isFirstChar = charIndex === 0
                    // 지그재그 효과: 짝수 인덱스는 위로, 홀수 인덱스는 아래로 (거의 일자로 보이도록 작게)
                    const zigzagOffset = globalIndex % 2 === 0 ? -3 : 3
                    
                    return (
                      <span
                        key={charIndex}
                        className={`brush-char ${isVisible ? "visible" : ""} ${isFirstChar ? "first-char" : ""}`}
                        style={{
                          transitionDelay: `${globalIndex * 0.1}s`,
                          '--zigzag-offset': `${zigzagOffset}px`,
                        } as React.CSSProperties}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    )
                  })}
                  {/* "!" 느낌표는 별도로 처리 */}
                  {exclamationMark && (
                    <span
                      className={`brush-char ${animatedChars.includes("!") ? "visible" : ""}`}
                      style={{
                        transitionDelay: `${(prevCharsCount + displayLine.length) * 0.1 + 0.5}s`, // 0.5초 딜레이 추가
                        '--zigzag-offset': `${(prevCharsCount + displayLine.length) % 2 === 0 ? -3 : 3}px`,
                      } as React.CSSProperties}
                    >
                      {exclamationMark}
                    </span>
                  )}
                </div>
              )
            })}
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
      <div className={`cover-content ${showContent ? "visible" : ""}`}>
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

