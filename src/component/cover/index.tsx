import { useState, useEffect, useRef } from "react"
import { GROOM_ENGLISH_NAME, BRIDE_ENGLISH_NAME, WEDDING_DATE, WEDDING_DATE_FORMAT, LOCATION } from "../../const"
import "./index.scss"

// 메인 히어로 이미지 경로
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/4.jpg`

export const Cover = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // 이미지가 이미 로드되어 있는 경우 (캐시된 경우)
    if (imgRef.current?.complete) {
      setImageLoaded(true)
    }

    // 페이지 로드 시 Fade-in up 애니메이션
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const formattedDate = WEDDING_DATE.format(WEDDING_DATE_FORMAT)

  return (
    <div className="cover">
      {/* 배경 이미지 */}
      <div className="hero-background">
        {!imageLoaded && <div className="hero-placeholder"></div>}
        <img
          ref={imgRef}
          src={HERO_IMAGE}
          alt="Wedding Hero Background"
          onLoad={handleImageLoad}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          fetchPriority="high"
          loading="eager"
        />
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
