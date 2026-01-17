import {
  GROOM_FULLNAME,
  GROOM_ENGLISH_NAME,
  GROOM_BIRTHDATE,
  GROOM_FATHER,
  GROOM_MOTHER,
  BRIDE_FULLNAME,
  BRIDE_ENGLISH_NAME,
  BRIDE_BIRTHDATE,
  BRIDE_FATHER,
  BRIDE_MOTHER,
} from "../../const"
import "./index.scss"

export const CoupleInfo = () => {
  return (
    <div className="couple-info">
      <h2 className="english-title">Couple</h2>
      <div className="content">
        <div className="groom">
          <div className="parents">
            {GROOM_FATHER}, {GROOM_MOTHER}의 아들
          </div>
          <div className="name-section">
            <div className="korean-name">신랑 {GROOM_FULLNAME}</div>
            <div className="birthdate">{GROOM_BIRTHDATE}</div>
            <div className="english-name">{GROOM_ENGLISH_NAME}</div>
          </div>
        </div>

        <div className="divider">&</div>

        <div className="bride">
          <div className="parents">
            {BRIDE_FATHER}, {BRIDE_MOTHER}의 딸
          </div>
          <div className="name-section">
            <div className="korean-name">신부 {BRIDE_FULLNAME}</div>
            <div className="birthdate">{BRIDE_BIRTHDATE}</div>
            <div className="english-name">{BRIDE_ENGLISH_NAME}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

