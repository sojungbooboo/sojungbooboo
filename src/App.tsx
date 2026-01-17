import { Cover } from './component/cover';
// import { Thanks } from './component/thanks'; // 삭제됨
import { Venue } from './component/venue';
import { DateInfo } from './component/dateInfo';
// import { CoupleInfo } from './component/coupleInfo'; // 삭제됨
import { Countdown } from './component/countdown';
import { Gallery } from './component/gallery';
import { Location } from './component/location';
// import { Transportation } from './component/transportation'; // 삭제됨
import { Notice } from './component/notice';
import { Accounts } from './component/accounts';
import { LazyDiv } from './component/lazyDiv';
import './App.scss';

function App() {
  return (
    <div className='app'>
      {/* 메인 화면 (랜딩 페이지) */}
      <Cover />

      {/* 감사인사 - 삭제 (높이 유지) */}
      <LazyDiv className='section thanks-section'>
        <div style={{ minHeight: '100vh' }}></div>
      </LazyDiv>

      {/* 일시 */}
      <LazyDiv className='section date-section'>
        <DateInfo />
      </LazyDiv>

      {/* 예식장 */}
      <LazyDiv className='section venue-section'>
        <Venue />
      </LazyDiv>

      {/* 부부소개 - 삭제 (높이 유지) */}
      <LazyDiv className='section couple-info'>
        <div style={{ minHeight: '100vh' }}></div>
      </LazyDiv>

      {/* 디데이 */}
      <LazyDiv className='section countdown-section'>
        <Countdown />
      </LazyDiv>

      {/* 사진 갤러리 */}
      <LazyDiv className='section gallery-section'>
        <Gallery />
      </LazyDiv>

      {/* 오시는 길 */}
      <LazyDiv className='section location-section'>
        <Location />
      </LazyDiv>

      {/* 교통 안내 - 삭제 (높이 유지) */}
      <LazyDiv className='section transportation-section'>
        <div style={{ minHeight: '100vh' }}></div>
      </LazyDiv>

      {/* 안내사항 */}
      <LazyDiv className='section notice-section'>
        <Notice />
      </LazyDiv>

      {/* 마음 전하실 곳 */}
      <LazyDiv className='section accounts-section'>
        <Accounts />
      </LazyDiv>
    </div>
  );
}

export default App;
