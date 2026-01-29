import { useEffect, useState, useRef } from "react"
import { WEDDING_DATE } from "../../const"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "./index.scss"

export const DateInfo = () => {
  const [showText, setShowText] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 부모 섹션이 lazy-active가 되었는지 확인
    const checkParent = () => {
      const parent = container.closest(".section")
      if (parent?.classList.contains("lazy-active")) {
        // 약간의 딜레이 후 애니메이션 시작
        setTimeout(() => {
          setShowText(true)
        }, 200)
      }
    }

    // MutationObserver로 부모 클래스 변경 감지
    const observer = new MutationObserver(checkParent)
    const parent = container.closest(".section")
    if (parent) {
      observer.observe(parent, {
        attributes: true,
        attributeFilter: ["class"],
      })
      checkParent() // 초기 체크
    }

    return () => observer.disconnect()
  }, [])

  // 날짜 포맷: MAR 28 2026 (영어 로케일로 포맷)
  const month = dayjs(WEDDING_DATE).locale("en").format("MMM").toUpperCase()
  const day = WEDDING_DATE.format("D")
  const year = WEDDING_DATE.format("YYYY")

  return (
    <div className="date-info" ref={containerRef}>
      <div className="date-content">
        <div className={`date-line ${showText ? "animate" : ""}`}>
          {month.split("").map((char, index) => (
            <span
              key={`month-${index}`}
              className="date-text month"
              style={{
                transitionDelay: `${0.1 * index}s`,
              }}
            >
              {char}
            </span>
          ))}
          <span className="date-text day" style={{ transitionDelay: "0.4s" }}>
            {day}
          </span>
        </div>
        <div className={`date-line year-line ${showText ? "animate" : ""}`}>
          {year.split("").map((char, index) => (
            <span
              key={`year-${index}`}
              className="date-text year"
              style={{
                transitionDelay: `${0.5 + 0.1 * index}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

