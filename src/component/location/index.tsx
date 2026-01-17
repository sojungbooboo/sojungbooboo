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
  // TODO: 카카오맵 API 과금 문제로 인해 임시 주석처리
  // 주석 해제하려면 아래 주석 블록을 제거하고 주석처리된 initMap 코드의 주석을 해제하세요
  useEffect(() => {
    if (!mapContainer.current) return
    // 카카오맵 API 호출 주석처리 - 주석 해제하려면 아래 주석 블록을 제거하세요
    /* KAKAO_MAP_API_START
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
            // triangle.png 배경 이미지를 가진 모든 div 요소 찾아서 제거
            const allDivs = document.querySelectorAll('div[style*="triangle.png"]')
            allDivs.forEach((div: any) => {
              if (div && div.style && div.style.backgroundImage && div.style.backgroundImage.includes('triangle.png')) {
                div.remove()
              }
            })

            // 더 광범위하게 모든 div 요소를 체크
            const mapContainer = mapContainer.current
            if (mapContainer) {
              const allDivsInMap = mapContainer.querySelectorAll('div')
              allDivsInMap.forEach((div: any) => {
                const style = div.getAttribute('style') || ''
                if (style.includes('triangle.png') || (div.style && div.style.backgroundImage && div.style.backgroundImage.includes('triangle.png'))) {
                  div.remove()
                }
              })
            }

            // 전역에서 triangle.png를 포함한 모든 요소 찾기
            const allElements = document.querySelectorAll('div')
            allElements.forEach((el: any) => {
              if (el.style && el.style.backgroundImage && el.style.backgroundImage.includes('triangle.png')) {
                el.remove()
              }
            })
          }, 100)

          // 여러 번 시도하여 확실히 제거
          setTimeout(() => {
            const allDivs = document.querySelectorAll('div')
            allDivs.forEach((div: any) => {
              const style = div.getAttribute('style') || ''
              if (style.includes('triangle.png') || (div.style && div.style.backgroundImage && div.style.backgroundImage.includes('triangle.png'))) {
                div.style.display = 'none'
                div.remove()
              }
            })
          }, 300)
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
    KAKAO_MAP_API_END */
    // 카카오맵 API 주석처리 완료 - 주석 해제하려면 위 주석 블록을 제거하고 아래 주석을 해제하세요
  }, [])

  return (
    <div className="location">
      <h2 className="english-title">Location</h2>
      <div className="content">
        <div className="map-container">
          {/* 카카오맵 API 주석처리로 인해 빈 네모박스 표시 - 주석 해제 시 지도가 표시됩니다 */}
          <div ref={mapContainer} className="kakao-map" style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.9rem' }}>
            Map (카카오맵 API 주석처리됨)
          </div>
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

