import { useState } from "react"
import { useModal } from "../modal"
import { GROOM_ACCOUNTS, BRIDE_ACCOUNTS } from "../../const"
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

  return (
    <div className="accounts">
      <h2>마음 전하실 곳</h2>
      <div className="content">
        <div className="accounts-buttons">
          <button className="account-button" onClick={handleGroomClick}>
            중화 가족
          </button>
          <button className="account-button" onClick={handleBrideClick}>
            소현 가족
          </button>
        </div>
      </div>
    </div>
  )
}

