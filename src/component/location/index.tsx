import { useState, useEffect, useRef } from "react"
import { LOCATION, LOCATION_ADDRESS, WEDDING_HALL_POSITION } from "../../const"
import "./index.scss"

declare global {
  interface Window {
    kakao: any
  }
}

export const Location = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(LOCATION_ADDRESS)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  // 카카오맵 API 로드 대기 및 초기화
  useEffect(() => {
    if (!mapContainer.current) return

    const initMap = () => {
      if (!mapContainer.current || !window.kakao || !window.kakao.maps) {
        return false
      }

      try {
        const { kakao } = window

        // 지도 생성
        // 카카오맵은 [위도, 경도] 순서를 사용 (WEDDING_HALL_POSITION[1]은 위도, [0]은 경도)
        const options = {
          center: new kakao.maps.LatLng(
            WEDDING_HALL_POSITION[1], // 위도
            WEDDING_HALL_POSITION[0]  // 경도
          ),
          level: 3, // 확대 레벨 (1-14, 숫자가 작을수록 확대)
        }

        const map = new kakao.maps.Map(mapContainer.current, options)
        mapRef.current = map

        // 마커 생성 및 표시
        const markerPosition = new kakao.maps.LatLng(
          WEDDING_HALL_POSITION[1], // 위도
          WEDDING_HALL_POSITION[0]  // 경도
        )

        const marker = new kakao.maps.Marker({
          position: markerPosition,
        })

        marker.setMap(map)

        // 인포윈도우 생성
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:12px 16px;font-size:14px;text-align:center;line-height:1.5;min-width:180px;">
            <strong>해군호텔 W웨딩홀</strong><br/>
            <strong>본관 노블레스홀</strong>
          </div>`,
        })

        // 화살표 제거 함수
        const removeArrow = () => {
          setTimeout(() => {
            // 카카오맵 인포윈도우의 화살표 요소 찾아서 제거
            const infoWindowElements = document.querySelectorAll('.info')
            infoWindowElements.forEach((info: any) => {
              // 화살표는 보통 ::before, ::after 또는 하위 요소로 존재
              if (info) {
                // 모든 하위 요소 중 화살표 관련 스타일 제거
                const style = info.getAttribute('style') || ''
                if (style.includes('::before') || style.includes('::after')) {
                  // CSS로 화살표 숨기기
                }
                
                // 화살표 요소 직접 찾아서 제거 시도
                const arrow = info.querySelector('[class*="arrow"]') || 
                             info.querySelector('div[style*="position"]')
                if (arrow) {
                  arrow.remove()
                }
              }
            })

            // 전역 스타일로 화살표 숨기기
            if (!document.getElementById('kakao-map-arrow-hide')) {
              const style = document.createElement('style')
              style.id = 'kakao-map-arrow-hide'
              style.textContent = `
                .info::before,
                .info::after,
                .info div[class*="arrow"],
                div[class*="InfoWindow"]::before,
                div[class*="InfoWindow"]::after,
                div[class*="InfoWindow"] div[class*="arrow"] {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                }
              `
              document.head.appendChild(style)
            }
          }, 100)
        }

        // 마커 클릭 시 인포윈도우 표시
        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker)
          removeArrow()
        })

        // 초기에 인포윈도우 표시
        infowindow.open(map, marker)
        removeArrow()

        setMapLoaded(true)
        return true
      } catch (error) {
        console.error("카카오맵 초기화 오류:", error)
        return false
      }
    }

    // 이미 로드되어 있으면 바로 실행
    if (window.kakao && window.kakao.maps) {
      initMap()
      return
    }

    // 카카오맵 API 로드 대기
    let checkCount = 0
    const maxChecks = 100 // 10초 (100 * 100ms)

    const checkKakaoAPI = setInterval(() => {
      checkCount++

      if (window.kakao && window.kakao.maps) {
        clearInterval(checkKakaoAPI)
        initMap()
      } else if (checkCount >= maxChecks) {
        clearInterval(checkKakaoAPI)
        console.error("카카오맵 API 로드 타임아웃 - 스크립트가 제대로 로드되지 않았습니다.")
      }
    }, 100)

    return () => {
      clearInterval(checkKakaoAPI)
    }
  }, [])

  return (
    <div className="location">
      <h2>오시는 길</h2>
      <div className="content">
        <div className="map-container">
          <div ref={mapContainer} className="kakao-map" />
        </div>
        <div className="venue-name">{LOCATION}</div>
        <div className="address-section">
          <p className="address">{LOCATION_ADDRESS}</p>
          <button
            className={`copy-button ${isCopied ? "copied" : ""}`}
            onClick={handleCopyAddress}
          >
            {isCopied ? "복사됨" : "주소 복사"}
          </button>
        </div>
      </div>
    </div>
  )
}

