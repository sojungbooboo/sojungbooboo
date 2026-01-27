import { LazyDiv } from "../lazyDiv"
import "./index.scss"

export const Thanks = () => {
  return (
    <>
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
                저희의 사랑이 새로운 시작을 하는 뜻깊은 날
                <br />
                축복으로 함께해 주신다면 큰 기쁨이 되겠습니다.
              </p>
            </div>
          </div>
        </div>
      </LazyDiv>
      <LazyDiv className="thanks-image-section">
        <div className="thanks-image">
          <img
            src={`${import.meta.env.BASE_URL}images/18_LWR01756-.jpg`}
            alt="Thanks"
          />
        </div>
      </LazyDiv>
    </>
  )
}

