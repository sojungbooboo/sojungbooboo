import { useState } from "react"
import { useModal } from "../modal"
import { GROOM_ACCOUNTS, BRIDE_ACCOUNTS, WEDDING_DATE, LOCATION, LOCATION_ADDRESS } from "../../const"
import "./index.scss"

const AccountItem = ({
  account,
  index,
}: {
  account: { name: string; bank: string; account: string }
  index: number
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(account.account)
    setCopiedIndex(index)
    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }

  return (
    <div className="account-item">
      <div className="account-name">{account.name}</div>
      <div className="account-info">
        {account.bank} {account.account}
      </div>
      <button
        className={`copy-button ${copiedIndex === index ? "copied" : ""}`}
        onClick={handleCopy}
      >
        {copiedIndex === index ? "복사됨" : "복사"}
      </button>
    </div>
  )
}

export const Accounts = () => {
  const { openModal } = useModal()
  const [copiedUrl, setCopiedUrl] = useState(false)

  const handleGroomClick = () => {
    openModal({
      content: (
        <div className="accounts-modal">
          <h3>중화 가족</h3>
          <div className="accounts-list">
            {GROOM_ACCOUNTS.map((account, idx) => (
              <AccountItem key={idx} account={account} index={idx} />
            ))}
          </div>
        </div>
      ),
      closeOnClickBackground: true,
    })
  }

  const handleBrideClick = () => {
    openModal({
      content: (
        <div className="accounts-modal">
          <h3>소현 가족</h3>
          <div className="accounts-list">
            {BRIDE_ACCOUNTS.map((account, idx) => (
              <AccountItem key={idx} account={account} index={idx} />
            ))}
          </div>
        </div>
      ),
      closeOnClickBackground: true,
    })
  }

  const handleCopyUrl = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
    setCopiedUrl(true)
    setTimeout(() => {
      setCopiedUrl(false)
    }, 2000)
  }

  const handleAddToCalendar = () => {
    // .ics 파일 생성
    const startDate = WEDDING_DATE.format("YYYYMMDDTHHmmss")
    const endDate = WEDDING_DATE.add(3, "hour").format("YYYYMMDDTHHmmss") // 3시간 후 종료
    const title = "JUNGHWA & SOHYUN 결혼식"
    const description = `${LOCATION}\n${LOCATION_ADDRESS}`
    const location = `${LOCATION}, ${LOCATION_ADDRESS}`

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "BEGIN:VALARM",
      "TRIGGER:-PT24H",
      "ACTION:DISPLAY",
      "DESCRIPTION:결혼식 하루 전 알림",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")

    // Blob 생성 및 다운로드
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "wedding-invitation.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="accounts">
      <h2>마음 전하실 곳</h2>
      <div className="description">
        <p>참석이 어려우신 분들을 위해 기재했습니다</p>
        <p>너그러운 마음으로 양해 부탁드립니다</p>
      </div>
      <div className="content">
        <div className="accounts-buttons">
          <button className="account-button" onClick={handleGroomClick}>
            <span>신랑측에게</span>
            <span className="chevron">▼</span>
          </button>
          <button className="account-button" onClick={handleBrideClick}>
            <span>신부측에게</span>
            <span className="chevron">▼</span>
          </button>
        </div>
      </div>
      
      <div className="share-section">
        <h3>청첩장 공유하기</h3>
        <div className="share-buttons">
          <button className="share-button calendar-button" onClick={handleAddToCalendar}>
            <span>캘린더 등록하기</span>
            <span className="icon">📅</span>
          </button>
          <button
            className={`share-button copy-button ${copiedUrl ? "copied" : ""}`}
            onClick={handleCopyUrl}
          >
            <span>{copiedUrl ? "복사됨" : "청첩장 주소 복사하기"}</span>
            <span className="icon">📋</span>
          </button>
        </div>
      </div>
    </div>
  )
}

