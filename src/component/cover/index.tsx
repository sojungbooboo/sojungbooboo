import { useState, useEffect } from "react"
import { GROOM_ENGLISH_NAME, BRIDE_ENGLISH_NAME, WEDDING_DATE, WEDDING_DATE_FORMAT, LOCATION } from "../../const"
import "./index.scss"

// 메인 히어로 이미지 경로
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/04_LWR00438-.jpg`

export const Cover = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 페이지 로드 시 Fade-in up 애니메이션
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const formattedDate = WEDDING_DATE.format(WEDDING_DATE_FORMAT)

  return (
    <div className="cover">
      {/* 배경 이미지 */}
      <div className="hero-background">
        <img src={HERO_IMAGE} alt="Wedding Hero Background" />
        {/* 반투명 검은색 오버레이 */}
        <div className="hero-overlay"></div>
      </div>

      {/* 텍스트 컨텐츠 */}
      <div className="hero-content">
        {/* 영문 이름 (중앙 상단) - 세 줄 레이아웃 */}
        <div className={`hero-names ${isVisible ? 'visible' : ''}`}>
          <h1 className="groom-name">JUNG HWA</h1>
          <div className="divider">&</div>
          <h1 className="bride-name">SO HYUN</h1>
        </div>

        {/* 날짜/시간/장소 정보 (화면 하단) */}
        <div className={`hero-info ${isVisible ? 'visible' : ''}`}>
          <p className="date">{formattedDate}</p>
          <p className="location">{LOCATION}</p>
        </div>
      </div>
    </div>
  )
}
