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
              <p className="quote">
                사람이 온다는 건 실은 어마어마한 일이다.
                <br />
                그는 그의 과거와 현재와 그리고
                <br />
                그의 미래와 함께 오기 때문이다.
                <br />
                한 사람의 일생이 오기 때문이다.
              </p>
              <p className="quote-author">- 정현종, '방문객'</p>
              <p className="message">
                저희 두 사람이 함께하는 새로운 시작에
                <br />
                귀한 발걸음으로 축복해 주시면 감사하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </LazyDiv>

      {/* 3. Thanks Image Section */}
      <LazyDiv className="thanks-image-section">
        <div className="thanks-image">
          <img
            src={`${import.meta.env.BASE_URL}images/18_LWR01756-.jpg`}
            alt="Thanks"
          />
        </div>
      </LazyDiv>

      {/* 4. Date Section */}
      <LazyDiv className='section date-section'>
        <DateInfo />
      </LazyDiv>

      {/* 5. Bridge Image #1 */}
      <BridgeImage 
        imagePath="14_LWR01352-1.jpg" 
        alt="Bridge Image 1"
        enableParallax={true}
      />

      {/* 6. Venue Section */}
      <LazyDiv className='section venue-section'>
        <Venue />
      </LazyDiv>

      {/* 7. Bridge Image #2 (신랑 독사진 추천) */}
      <BridgeImage 
        imagePath="23_LWR01860-.jpg" 
        alt="Bridge Image 2"
        enableParallax={true}
      />

      {/* 8. Couple Info Section */}
      <LazyDiv className='section couple-info'>
        <CoupleInfo />
      </LazyDiv>

      {/* 9. Bridge Image #3 (신부 독사진 추천) */}
      <BridgeImage 
        imagePath="22_LWR02071_파란하늘o-.jpg" 
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
