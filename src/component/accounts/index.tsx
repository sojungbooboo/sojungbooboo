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

  const handleKakaoShare = () => {
    const currentUrl = window.location.href

    // index.html의 제목/설명과 동일하게 맞춘 텍스트
    const shareTitle = "중화 ❤️ 소현 결혼합니다."
    const shareDescription = "2026년 3월 28일 토요일 오전 11시 30분 해군호텔 W웨딩홀"

    // Web Share API 사용 (모바일 네이티브 공유)
    if (navigator.share) {
      navigator
        .share({
          title: shareTitle,
          text: `${shareTitle}\n${shareDescription}`,
          url: currentUrl,
        })
        .catch((error) => {
          console.log("공유 취소 또는 오류:", error)
        })
    } else {
      // Web Share API를 지원하지 않는 경우 (데스크톱 등)
      // URL을 클립보드에 복사하고 안내 메시지 표시
      navigator.clipboard.writeText(currentUrl)
      alert("청첩장 주소가 클립보드에 복사되었습니다.\n카카오톡에서 붙여넣기하여 공유해주세요.")
    }
  }

  return (
    <div className="accounts">
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
        <h2 className="english-title share-title">Share</h2>
        <div className="share-buttons">
          <button className="share-button kakao-share-button" onClick={handleKakaoShare}>
            <span>공유하기</span>
            <i className="fas fa-share-alt icon"></i>
          </button>
          <button
            className={`share-button copy-button ${copiedUrl ? "copied" : ""}`}
            onClick={handleCopyUrl}
          >
            <span>{copiedUrl ? "복사됨" : "청첩장 주소 복사하기"}</span>
            <i className="fas fa-clipboard icon"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

