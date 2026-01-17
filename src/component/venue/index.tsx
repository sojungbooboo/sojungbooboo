import { LOCATION } from "../../const"
import "./index.scss"

export const Venue = () => {
  return (
    <div className="venue">
      <h2 className="english-title">Venue</h2>
      <div className="content">
        <p className="venue-name">{LOCATION}</p>
      </div>
    </div>
  )
}

