import "./index.scss"

export const Cover = () => {
  return (
    <div className="cover">
      <div className="cover-image">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" 
          alt="Wedding Cover" 
        />
        <div className="overlay" />
      </div>
      <div className="cover-content">
        <div className="names">
          <span className="groom-name">JUNGHWA</span>
          <span className="divider">&</span>
          <span className="bride-name">SOHYUN</span>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="arrow">↓</div>
      </div>
    </div>
  )
}

