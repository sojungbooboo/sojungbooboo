# 모바일 청첩장 - JUNGHWA & SOHYUN

결혼식 모바일 청첩장 웹사이트입니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Sass
- Day.js

## 설치 및 실행

### 개발 서버 실행

```bash
npm install
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
npm run build
```

빌드 결과물은 `build` 폴더에 생성됩니다.

### 미리보기

```bash
npm run preview
```

## 배포

GitHub Pages에 배포하려면:

1. `package.json`의 `homepage` 필드를 확인하세요.
2. `vite.config.ts`의 `base` 경로가 올바른지 확인하세요.
3. 빌드 후 `build` 폴더의 내용을 GitHub Pages에 배포하세요.

## 주요 기능

- ✅ 풀스크린 메인 커버 화면
- ✅ 감사인사
- ✅ 예식장 및 일시 정보
- ✅ 부부소개
- ✅ 실시간 디데이 카운트다운
- ✅ 사진 갤러리 (좌우 스크롤)
- ✅ 오시는 길 (지도 링크, 주소 복사)
- ✅ 교통 안내 (버스, 지하철, 셔틀, 주차)
- ✅ 안내사항
- ✅ 마음 전하실 곳 (계좌 정보 모달)

## 커스터마이징

### 정보 수정

`src/const.ts` 파일에서 다음 정보를 수정할 수 있습니다:

- 예식일 (`WEDDING_DATE`)
- 예식장 정보 (`LOCATION`, `LOCATION_ADDRESS`)
- 신랑/신부 정보
- 계좌 정보

### 스타일 수정

`src/App.scss`의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```scss
:root {
  --primary-color: #d4a574;  // 메인 컬러
  --primary-light: #f5e6d3;  // 라이트 컬러
  --text-dark: #2c2c2c;      // 다크 텍스트
  --text-light: #666666;      // 라이트 텍스트
}
```

## 참고

- 디자인 레퍼런스: https://toourguest.com/preview/miami
- 오픈소스 기반: `/ref/wedding-invitation-main`

