import { LazyDiv } from "../lazyDiv"
import "./index.scss"

export const Thanks = () => {
  return (
    <>
      <LazyDiv className="thanks-text-section">
        <div className="thanks">
          <h2 className="english-title">Thanks</h2>
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
      <LazyDiv className="thanks-image-section">
        <div className="thanks-image">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
            alt="Thanks"
          />
        </div>
      </LazyDiv>
    </>
  )
}

