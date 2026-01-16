import "./index.scss"

export const Notice = () => {
  return (
    <div className="notice">
      <h2>안내사항</h2>
      <div className="content">
        <p className="notice-text">
          장소가 협소하여 화환 받지 않음
        </p>
        <div className="notice-image">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80"
            alt="Notice"
          />
        </div>
      </div>
    </div>
  )
}

