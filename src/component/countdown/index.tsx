import { useState, useEffect } from "react"
import { WEDDING_DATE } from "../../const"
import "./index.scss"

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const weddingTime = WEDDING_DATE.toDate().getTime()
      const difference = weddingTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="countdown">
      <h2 className="english-title">D-DAY</h2> // 이미 대문자
      <div className="content">
        <p className="message">
          중화 & 소현의 결혼식이 <span className="days">{timeLeft.days}</span>일
          남았습니다.
        </p>
        <div className="timer">
          <div className="time-unit">
            <div className="value">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="label">DAY</div>
          </div>
          <div className="separator">:</div>
          <div className="time-unit">
            <div className="value">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="label">Hour</div>
          </div>
          <div className="separator">:</div>
          <div className="time-unit">
            <div className="value">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="label">MIN</div>
          </div>
          <div className="separator">:</div>
          <div className="time-unit">
            <div className="value">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="label">SEC</div>
          </div>
        </div>
      </div>
    </div>
  )
}

