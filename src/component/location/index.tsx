import { useState } from "react"
import { LOCATION, LOCATION_ADDRESS, WEDDING_HALL_POSITION } from "../../const"
import "./index.scss"

export const Location = () => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(LOCATION_ADDRESS)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  // 카카오맵 공유 링크를 iframe으로 임베드
  const mapUrl = `https://map.kakao.com/link/map/${WEDDING_HALL_POSITION[1]},${WEDDING_HALL_POSITION[0]}`

  return (
    <div className="location">
      <h2>오시는 길</h2>
      <div className="content">
        <div className="map-container">
          <iframe
            src={`https://map.kakao.com/link/map/${WEDDING_HALL_POSITION[1]},${WEDDING_HALL_POSITION[0]}`}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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

