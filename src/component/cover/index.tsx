import { useState, useEffect } from "react"
import { GROOM_ENGLISH_NAME, BRIDE_ENGLISH_NAME, WEDDING_DATE, WEDDING_DATE_FORMAT, LOCATION } from "../../const"
import "./index.scss"

// 이미지 레이아웃 시안 선택: 'framed' (액자형) 또는 'fullwidth' (풀사이즈)
const IMAGE_LAYOUT: 'framed' | 'fullwidth' = 'framed'

// 메인 히어로 이미지 경로 (나중에 변경 가능)
// base 경로를 고려하여 경로 설정
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
    <div className={`cover ${IMAGE_LAYOUT === 'fullwidth' ? 'fullwidth-layout' : 'framed-layout'}`}>
      <div className="cover-container">
        {/* 영문 이름 (상단) */}
        <div className={`hero-names ${isVisible ? 'visible' : ''}`}>
          <h1 className="groom-name">{GROOM_ENGLISH_NAME.toUpperCase()}</h1>
          <span className="divider">&</span>
          <h1 className="bride-name">{BRIDE_ENGLISH_NAME.toUpperCase()}</h1>
        </div>

        {/* 메인 이미지 */}
        <div className={`hero-image ${isVisible ? 'visible' : ''}`}>
          <img src={HERO_IMAGE} alt="Wedding Hero" />
        </div>

        {/* 날짜/시간/장소 정보 (이미지 하단) */}
        <div className={`hero-info ${isVisible ? 'visible' : ''}`}>
          <p className="date">{formattedDate}</p>
          <p className="location">{LOCATION}</p>
        </div>
      </div>
    </div>
  )
}
