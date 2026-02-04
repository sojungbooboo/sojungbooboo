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

        // 지도 생성 (카카오맵은 [위도, 경도] 순서: WEDDING_HALL_POSITION[1]=위도, [0]=경도)
        const options = {
          center: new kakao.maps.LatLng(
            WEDDING_HALL_POSITION[1],
            WEDDING_HALL_POSITION[0]
          ),
          level: 3,
        }

        const map = new kakao.maps.Map(mapContainer.current, options)
        mapRef.current = map

        const markerPosition = new kakao.maps.LatLng(
          WEDDING_HALL_POSITION[1],
          WEDDING_HALL_POSITION[0]
        )
        const marker = new kakao.maps.Marker({ position: markerPosition })
        marker.setMap(map)

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:12px 16px;font-size:12px;text-align:center;line-height:1.5;min-width:180px;">
            <strong>해군호텔 W웨딩홀</strong><br/>
            <strong>본관 노블레스홀</strong>
          </div>`,
        })

        const removeArrow = () => {
          const containerEl = mapContainer.current
          setTimeout(() => {
            document.querySelectorAll('div[style*="triangle.png"]').forEach((div: any) => {
              if (div?.style?.backgroundImage?.includes('triangle.png')) div.remove()
            })
            if (containerEl) {
              containerEl.querySelectorAll('div').forEach((div: any) => {
                const style = div.getAttribute('style') || ''
                if (style.includes('triangle.png') || div.style?.backgroundImage?.includes('triangle.png')) {
                  div.remove()
                }
              })
            }
            document.querySelectorAll('div').forEach((el: any) => {
              if (el.style?.backgroundImage?.includes('triangle.png')) el.remove()
            })
          }, 100)
          setTimeout(() => {
            document.querySelectorAll('div').forEach((div: any) => {
              const style = div.getAttribute('style') || ''
              if (style.includes('triangle.png') || (div as any).style?.backgroundImage?.includes('triangle.png')) {
                ;(div as HTMLElement).style.display = 'none'
                div.remove()
              }
            })
          }, 300)
        }

        kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker)
          removeArrow()
        })
        infowindow.open(map, marker)
        removeArrow()

        setMapLoaded(true)
        return true
      } catch (error) {
        console.error("카카오맵 초기화 오류:", error)
        return false
      }
    }

    if (window.kakao && window.kakao.maps) {
      initMap()
      return
    }

    let checkCount = 0
    const maxChecks = 100
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

    return () => clearInterval(checkKakaoAPI)
  }, [])

  return (
    <div className="location">
      <h2 className="english-title">Location</h2>
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

