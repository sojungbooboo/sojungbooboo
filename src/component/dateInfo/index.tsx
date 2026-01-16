import { WEDDING_DATE, WEDDING_DATE_FORMAT } from "../../const"
import "./index.scss"

export const DateInfo = () => {
  return (
    <div className="date-info">
      <h2>일시</h2>
      <div className="content">
        <p className="date">{WEDDING_DATE.format(WEDDING_DATE_FORMAT)}</p>
      </div>
    </div>
  )
}

