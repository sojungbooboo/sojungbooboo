import { Cover } from "./component/cover"
import { Thanks } from "./component/thanks"
import { Venue } from "./component/venue"
import { DateInfo } from "./component/dateInfo"
import { CoupleInfo } from "./component/coupleInfo"
import { Countdown } from "./component/countdown"
import { Gallery } from "./component/gallery"
import { Location } from "./component/location"
import { Transportation } from "./component/transportation"
import { Notice } from "./component/notice"
import { Accounts } from "./component/accounts"
import { LazyDiv } from "./component/lazyDiv"
import "./App.scss"

function App() {
  return (
    <div className="app">
      {/* 메인 화면 (랜딩 페이지) */}
      <Cover />

      {/* 감사인사 */}
      <Thanks />

      {/* 예식장 */}
      <LazyDiv className="section">
        <Venue />
      </LazyDiv>

      {/* 일시 */}
      <LazyDiv className="section">
        <DateInfo />
      </LazyDiv>

      {/* 부부소개 */}
      <LazyDiv className="section">
        <CoupleInfo />
      </LazyDiv>

      {/* 디데이 */}
      <LazyDiv className="section">
        <Countdown />
      </LazyDiv>

      {/* 사진 갤러리 */}
      <LazyDiv className="section">
        <Gallery />
      </LazyDiv>

      {/* 오시는 길 */}
      <LazyDiv className="section">
        <Location />
      </LazyDiv>

      {/* 교통 안내 */}
      <LazyDiv className="section">
        <Transportation />
      </LazyDiv>

      {/* 안내사항 */}
      <LazyDiv className="section">
        <Notice />
      </LazyDiv>

      {/* 마음 전하실 곳 */}
      <LazyDiv className="section">
        <Accounts />
      </LazyDiv>
    </div>
  )
}

export default App

