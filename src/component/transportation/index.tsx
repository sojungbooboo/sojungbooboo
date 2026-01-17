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
            <p className='detail'>
              간선: 150, 461, 500, 505, 753
              <br />
              지선: 5531, 5534, 5612, 5623, 5633
            </p>
          </div>
        </div>

        <div className='transport-section'>
          <h3>지하철</h3>
          <div className='transport-boxes'>
            <div className='transport-box'>
              <p className='line'>1호선 대방역 (마을버스)</p>
              <p className='detail'>
                대방역(19253정류장) 마을버스07 서울해군호텔하차
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>7호선 신풍역 (지선버스)</p>
              <p className='detail'>
                3번출구(19219정류장) 6654버스 서울해군호텔하차
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>7호선 보라매역 (도보)</p>
              <p className='detail'>
                5번 출구에서 200m 영진시장삼거리에서 우회전 300m
              </p>
            </div>
            <div className='transport-box'>
              <p className='line'>신림선 서울지방병무청역 (도보)</p>
              <p className='detail'>
                2번 출구에서 100m 해군회관 앞 사거리에서 우회전 400m
              </p>
            </div>
          </div>
        </div>

        <div className='transport-section'>
          <h3>무료셔틀버스</h3>
          <div className='transport-boxes'>
            <div className='transport-box'>
              <p className='line'>1호선 대방역 3번 출구</p>
            </div>
            <div className='transport-box'>
              <p className='line'>7호선 보라매역 5번 출구</p>
            </div>
          </div>
          <p className='shuttle-note'>
            (예식시간 1시간 30분 전부터 10~15분 간격 운행)
          </p>
        </div>

        <div className='transport-section'>
          <h3>주차</h3>
          <div className='transport-box'>
            <p className='detail'>
              주차직원 안내에 따라 해군호텔W웨딩홀 주차장 이용 (2시간 무료)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
