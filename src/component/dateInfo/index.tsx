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

  // SVG 경로 애니메이션을 위한 pathLength 계산
  const pathLength1 = 1000
  const pathLength2 = 1200
  const pathLength3 = 1100

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
        {/* 첫 번째 곡선 */}
        <path
          d="M 0,200 Q 100,150 200,200 T 400,200 T 500,200"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="2"
          strokeLinecap="round"
          className="svg-path path-1"
          style={{
            strokeDasharray: pathLength1,
            strokeDashoffset: pathLength1 * (1 - scrollProgress * 0.8),
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />
        {/* 두 번째 곡선 */}
        <path
          d="M 0,400 Q 150,350 300,400 T 500,400"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="2"
          strokeLinecap="round"
          className="svg-path path-2"
          style={{
            strokeDasharray: pathLength2,
            strokeDashoffset: pathLength2 * (1 - scrollProgress * 0.7),
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />
        {/* 세 번째 곡선 */}
        <path
          d="M 0,600 Q 120,550 250,600 T 500,600"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="2"
          strokeLinecap="round"
          className="svg-path path-3"
          style={{
            strokeDasharray: pathLength3,
            strokeDashoffset: pathLength3 * (1 - scrollProgress * 0.9),
            transition: 'stroke-dashoffset 0.1s ease-out'
          }}
        />
        {/* 네 번째 곡선 (하단) */}
        <path
          d="M 0,800 Q 200,750 400,800 T 500,800"
          fill="none"
          stroke="rgba(0, 0, 0, 0.05)"
          strokeWidth="2"
          strokeLinecap="round"
          className="svg-path path-4"
          style={{
            strokeDasharray: pathLength1,
            strokeDashoffset: pathLength1 * (1 - scrollProgress * 0.6),
            transition: 'stroke-dashoffset 0.1s ease-out'
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

