import { useEffect, useState, useRef } from "react"
import { WEDDING_DATE } from "../../const"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "./index.scss"

export const DateInfo = () => {
  const [showText, setShowText] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

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

  // 스크롤 기반 SVG 애니메이션
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // 섹션이 뷰포트에 들어왔을 때만 애니메이션
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 날짜 포맷: MAR 28 2026 (영어 로케일로 포맷)
  const month = dayjs(WEDDING_DATE).locale("en").format("MMM").toUpperCase()
  const day = WEDDING_DATE.format("D")
  const year = WEDDING_DATE.format("YYYY")

  // SVG 경로 애니메이션을 위한 pathLength 계산 (세로 곡선 하나)
  const pathLength = 1600

  return (
    <div className="date-info" ref={containerRef}>
      {/* SVG 배경 애니메이션 */}
      <svg
        ref={svgRef}
        className="date-svg-background"
        viewBox="0 0 500 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 세로로 흐르는 곡선 하나 */}
        <path
          d="M 250,0 C 280,150 220,300 260,450 C 300,600 240,750 260,1000"
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="svg-path vertical-path"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength * (1 - scrollProgress),
            transition: 'stroke-dashoffset 0.12s ease-out'
          }}
        />
      </svg>

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

