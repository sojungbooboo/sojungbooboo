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
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(LOCATION_ADDRESS)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  useEffect(() => {
    if (!mapContainer.current) return

    // 카카오맵 API가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      const { kakao } = window

      // 지도 생성
      const options = {
        center: new kakao.maps.LatLng(
          WEDDING_HALL_POSITION[1],
          WEDDING_HALL_POSITION[0]
        ),
        level: 3, // 확대 레벨 (1-14, 숫자가 작을수록 확대)
      }

      const map = new kakao.maps.Map(mapContainer.current, options)
      mapRef.current = map

      // 마커 생성 및 표시
      const markerPosition = new kakao.maps.LatLng(
        WEDDING_HALL_POSITION[1],
        WEDDING_HALL_POSITION[0]
      )

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(map)

      // 인포윈도우 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;font-size:14px;text-align:center;">
          <strong>${LOCATION}</strong><br/>
          ${LOCATION_ADDRESS}
        </div>`,
      })

      // 마커 클릭 시 인포윈도우 표시
      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker)
      })

      // 초기에 인포윈도우 표시
      infowindow.open(map, marker)
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

