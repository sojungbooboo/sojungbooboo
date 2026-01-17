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
          content: `<div style="padding:10px;font-size:14px;text-align:center;">
            <strong>${LOCATION}</strong>
          </div>`,
        })

        // 마커 클릭 시 인포윈도우 표시
        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.open(map, marker)
        })

        // 초기에 인포윈도우 표시
        infowindow.open(map, marker)

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

