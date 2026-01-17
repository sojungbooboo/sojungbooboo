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
    const shareText = "JUNGHWA & SOHYUN 결혼식 청첩장"
    
    // 카카오톡 링크 공유 URL 생성
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedText = encodeURIComponent(shareText)
    const kakaoShareUrl = `https://sharer.kakao.com/talk/friends/picker/slink?url=${encodedUrl}&text=${encodedText}`
    
    // 새 창으로 카카오톡 공유 페이지 열기
    window.open(kakaoShareUrl, "_blank", "width=600,height=600")
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
            <span>카카오톡 공유하기</span>
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

