import "./index.scss"

export const Notice = () => {
  return (
    <div className="notice">
      <div className="notice-header">
        <h2 className="english-title">INFORMATION</h2>
      </div>
      <div className="content">
        <div className="notice-card">
          <div className="notice-image">
            <img
              src={`${import.meta.env.BASE_URL}images/3.jpeg`}
              alt="Notice"
            />
          </div>
          <div className="notice-text-section">
            <h3 className="notice-title">화환 안내</h3>
            <p className="notice-text">
              장소가 협소하여 화환 받지 않음
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

