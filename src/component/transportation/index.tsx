import './index.scss';

export const Transportation = () => {
  return (
    <div className='transportation'>
      <div className='divider'></div>
      <div className='content'>
        <div className='transport-section'>
          <h3>버스</h3>
          <div className='transport-box'>
            <p className='line'>강남중학교(서울지방 병무청 앞 사거리) 하차</p>
            <div className='detail bus-detail'>
              <div className='bus-line'>
                <span className='bus-line-label'>간선</span>
                <span className='bus-badge bus-badge--blue'>150</span>
                <span className='bus-badge bus-badge--blue'>461</span>
                <span className='bus-badge bus-badge--blue'>500</span>
                <span className='bus-badge bus-badge--blue'>505</span>
                <span className='bus-badge bus-badge--blue'>753</span>
              </div>
              <div className='bus-line'>
                <span className='bus-line-label'>지선</span>
                <span className='bus-badge bus-badge--green'>5531</span>
                <span className='bus-badge bus-badge--green'>5534</span>
                <span className='bus-badge bus-badge--green'>5612</span>
                <span className='bus-badge bus-badge--green'>5623</span>
                <span className='bus-badge bus-badge--green'>5633</span>
              </div>
            </div>
          </div>
        </div>

        <div className='transport-section'>
          <h3>지하철</h3>
          <div className='transport-boxes'>
            <div className='transport-box'>
              <p className='line'>
                <span className='subway-number subway-number--line1'>1</span>
                <span className='subway-station'>대방역</span>
                <span className='subway-note'>마을버스</span>
              </p>
              <p className='detail'>
                대방역(19253정류장)
                <br />
                마을버스 07번 승차 → 서울해군호텔 하차
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>
                <span className='subway-number subway-number--line7'>7</span>
                <span className='subway-station'>신풍역</span>
                <span className='subway-note'>지선버스</span>
              </p>
              <p className='detail'>
                3번 출구(19219정류장)
                <br />
                지선버스 6654번 승차 → 서울해군호텔 하차
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>
                <span className='subway-number subway-number--line7'>7</span>
                <span className='subway-station'>보라매역</span>
                <span className='subway-note'>도보</span>
              </p>
              <p className='detail'>
                5번 출구에서 200m 직진 후
                <br />
                영진시장 삼거리에서 우회전 300m
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>
                <span className='subway-number subway-number--sillim'>신림</span>
                <span className='subway-station'>서울지방병무청역</span>
                <span className='subway-note'>도보</span>
              </p>
              <p className='detail'>
                2번 출구에서 100m 직진 후
                <br />
                해군회관 앞 사거리에서 우회전 400m
              </p>
            </div>
          </div>
        </div>

        <div className='transport-section'>
          <div className='section-header'>
            <h3>무료셔틀버스</h3>
            <p className='shuttle-note'>
              예식시간 1시간 30분 전부터 10~15분 간격 운행
            </p>
          </div>
          <div className='transport-boxes'>
            <div className='transport-box'>
              <p className='line'>
                <span className='subway-number subway-number--line1'>1</span>
                <span className='subway-station'>대방역 3번 출구</span>
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>
                <span className='subway-number subway-number--line7'>7</span>
                <span className='subway-station'>보라매역 5번 출구</span>
              </p>
            </div>
          </div>
        </div>

        <div className='transport-section'>
          <div className='section-header'>
            <h3>주차</h3>
            <p className='parking-note'>2시간 무료</p>
          </div>
          <div className='transport-box'>
            <p className='detail'>
              주차직원 안내에 따라 해군호텔 W웨딩홀 주차장 이용
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
