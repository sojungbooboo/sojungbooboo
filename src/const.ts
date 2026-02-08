import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

// 예식일: 2026년 3월 28일 토요일 오전 11시 30분
export const WEDDING_DATE = dayjs.tz("2026-03-28 11:30", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = "YYYY년 M월 D일 dddd A h시 m분"

export const LOCATION = "해군호텔 W웨딩홀 본관 노블레스홀"
export const LOCATION_ADDRESS = "서울특별시 영등포구 가마산로 540"

// 지도 좌표 (해군호텔 W웨딩홀 본관 노블레스홀)
// [경도, 위도] 형식
export const WEDDING_HALL_POSITION = [126.9156, 37.50359]

// 카카오 지도 장소 ID (실제 ID로 수정 필요)
export const KMAP_PLACE_ID = 0

// 카카오맵 JavaScript API Key
// 발급 방법: https://developers.kakao.com → 내 애플리케이션 → JavaScript 키
// 무료 할당량: 월 300,000건 (과금 걱정 없음)
export const KAKAO_MAP_API_KEY = "33ca32716a75107b1da61cc1b76a0f7a"

// 신랑 정보
export const GROOM_FULLNAME = "송중화"
export const GROOM_ENGLISH_NAME = "Song Jung Hwa"
export const GROOM_BIRTHDATE = "97년 8월 11일"
export const GROOM_FATHER = "송선식"
export const GROOM_MOTHER = "노옥래"

// 신부 정보
export const BRIDE_FULLNAME = "신소현"
export const BRIDE_ENGLISH_NAME = "Shin So Hyeon"
export const BRIDE_BIRTHDATE = "97년 7월 31일"
export const BRIDE_FATHER = "신종화"
export const BRIDE_MOTHER = "김경란"

// 계좌 정보
export const GROOM_ACCOUNTS = [
  { name: "송선식", bank: "하나은행", account: "069-19-27018-5" },
  { name: "노옥래", bank: "하나은행", account: "620-155689-551" },
  { name: "송중화", bank: "케이뱅크", account: "100136847986" },
]

export const BRIDE_ACCOUNTS = [
  { name: "신종화", bank: "기업은행", account: "033-065198-01-014" },
  { name: "김경란", bank: "국민은행", account: "463-5010-1244-847" },
  { name: "신소현", bank: "카카오뱅크", account: "3333-037-200-594" },
]

