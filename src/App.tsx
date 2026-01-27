import { useEffect } from 'react';
import { Cover } from './component/cover';
import { BridgeImage } from './component/bridgeImage';
import { Venue } from './component/venue';
import { DateInfo } from './component/dateInfo';
import { CoupleInfo } from './component/coupleInfo';
import { Countdown } from './component/countdown';
import { Gallery } from './component/gallery';
import { Location } from './component/location';
import { Transportation } from './component/transportation';
import { Notice } from './component/notice';
import { Accounts } from './component/accounts';
import { LazyDiv } from './component/lazyDiv';
import './App.scss';

function App() {
  // 모바일 브라우저 툴바로 인한 뷰포트 높이 변경 방지
  useEffect(() => {
    const setVh = () => {
      // 초기 뷰포트 높이를 측정하고 CSS 변수로 설정
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 초기 설정
    setVh();

    // 리사이즈 이벤트는 최소화 (초기 높이만 고정)
    // 주의: resize 이벤트 리스너는 추가하지 않음 (초기 높이만 유지)
  }, []);
  return (
    <div className='app'>
      {/* 1. Hero Section */}
      <Cover />

      {/* 2. Thanks Text Section */}
      <LazyDiv className="thanks-text-section">
        <div className="thanks">
          <div className="content">
            <div className="thanks-text">
              <p className="message">
                꽃이 피어나는 계절,
                <br />
                서로에게 봄이 되어준 저희 두 사람이
                <br />
                3월의 밝은 햇살 아래 새로운 시작을 하려 합니다.
                <br />
                <br />
                <br />
                저희의 사랑이 새로운 시작을 하는 뜻깊은 날
                <br />
                축복으로 함께해 주신다면 큰 기쁨이 되겠습니다.
              </p>
              <p className="signature">- 신랑 송중화 · 신부 신소현</p>
            </div>
          </div>
        </div>
      </LazyDiv>

      {/* 3. Thanks Image Section */}
      <LazyDiv className="thanks-image-section">
        <div className="thanks-image">
          <img
            src={`${import.meta.env.BASE_URL}images/1.jpeg`}
            alt="Thanks"
          />
        </div>
      </LazyDiv>

      {/* 4. Date Section */}
      <LazyDiv className='section date-section'>
        <DateInfo />
      </LazyDiv>

      {/* 5. Venue Section */}
      <LazyDiv className='section venue-section'>
        <Venue />
      </LazyDiv>

      {/* 6. Bridge Image #2 (신랑 독사진 추천) */}
      <BridgeImage 
        imagePath="2.jpeg" 
        alt="Bridge Image 2"
        enableParallax={true}
      />

      {/* 7. Couple Info Section */}
      <LazyDiv className='section couple-info'>
        <CoupleInfo />
      </LazyDiv>

      {/* 8. Bridge Image #3 (신부 독사진 추천) */}
      <BridgeImage 
        imagePath="3.jpeg" 
        alt="Bridge Image 3"
        enableParallax={true}
      />

      {/* 10. 디데이 */}
      <LazyDiv className='section countdown-section'>
        <Countdown />
      </LazyDiv>

      {/* 11. 사진 갤러리 */}
      <LazyDiv className='section gallery-section'>
        <Gallery />
      </LazyDiv>

      {/* 12. 오시는 길 */}
      <LazyDiv className='section location-section'>
        <Location />
      </LazyDiv>

      {/* 13. 교통 안내 */}
      <LazyDiv className='section transportation-section'>
        <Transportation />
      </LazyDiv>

      {/* 14. 안내사항 */}
      <LazyDiv className='section notice-section'>
        <Notice />
      </LazyDiv>

      {/* 15. 마음 전하실 곳 */}
      <LazyDiv className='section accounts-section'>
        <Accounts />
      </LazyDiv>
    </div>
  );
}

export default App;
