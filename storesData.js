// 이 파일은 MongoDB에서 추출된 가게 데이터를 포함합니다.
// 자동 생성된 파일이므로 직접 수정하지 않는 것이 좋습니다.

const storesData = [
  {
    "name": "노릇노릇",
    "foodCategory": "한식" // 구이류 추정
  },
  {
    "name": "소코아",
    "foodCategory": "일식" // 카레, 돈부리 전문점
  },
  {
    "name": "알촌",
    "foodCategory": "한식" // 알밥 전문점
  },
  {
    "name": "천지연삼겹살",
    "foodCategory": "한식" // 삼겹살
  },
  {
    "name": "키노리",
    "foodCategory": "일식" // 일식 덮밥/라멘 전문점
  },
  {
  "name": "동흥루",
    "foodCategory": "중식" // 중국집 이름
  },
  {
    "name": "가마솥옛날국밥",
    "foodCategory": "한식" // 국밥 전문점
  },
  {
    "name": "오븐마루치킨",
    "foodCategory": "기타" // 치킨 (분류 애매, 한식/양식 둘다 걸쳐있음. 일단 기타)
  },
  {
    "name": "생돈까스",
    "foodCategory": "일식" // 돈까스는 일식으로 분류
  },
  {
    "name": "도스마스",
    "foodCategory": "양식" // 멕시칸, 타코, 브리또 전문점
  },
  {
    "name": "통큰",
    "foodCategory": "한식" // 상호명만으로는 불분명하지만 보통 한식 고깃집이나 찌개류에 많음
  },
  {
    "name": "카츠앤맘",
    "foodCategory": "일식" // 카츠(돈까스) 전문점
  },
  {
    "name": "수진식당",
    "foodCategory": "한식" // 일반 한식당 느낌
  },
  {
    "name": "마라미녀마라탕",
    "foodCategory": "중식" // 마라탕 전문점
  },
  {
    "name": "테이스티",
    "foodCategory": "기타" // 이름만으로는 분류 불가, 카페나 브런치 등 '기타'로 분류
  },
  {
    "name": "전대맛칼국수",
    "foodCategory": "한식" // 칼국수 전문점
  },
  {
    "name": "무등골금호식당",
    "foodCategory": "한식" // 한정식/백반 느낌
  },
  {
    "name": "잇샌드",
    "foodCategory": "양식" // 샌드위치 전문점
  },
  {
    "name": "찐한사골국밥",
    "foodCategory": "한식" // 국밥 전문점
  },
  {
    "name": "금룡황제쟁반짜장",
    "foodCategory": "중식" // 중국집 이름
  },
  {
    "name": "만계치킨",
    "foodCategory": "기타" // 치킨 (오븐마루와 동일)
  },
  {
    "name": "엄니손맛",
    "foodCategory": "한식" // 백반/집밥 느낌
  },
  {
    "name": "북경깐풍기",
    "foodCategory": "중식" // 깐풍기는 중국 요리
  },
  {
    "name": "안탈야케밥",
    "foodCategory": "기타" // 터키 음식 (케밥)
  },
  {
    "name": "원조",
    "foodCategory": "한식" // 보편적인 한식당 상호
  },
  {
    "name": "벤또스시",
    "foodCategory": "일식" // 벤또, 스시 전문점
  },
  {
    "name": "고을나주곰탕",
    "foodCategory": "한식" // 곰탕 전문점
  },
  {
    "name": "피자브라더스",
    "foodCategory": "양식" // 피자 전문점
  },
  {
    "name": "샤브향",
    "foodCategory": "한식" // 샤브샤브 (보통 한식/베트남식에 걸쳐있으나 일반적으로는 한식)
  },
  {
    "name": "스피드반점",
    "foodCategory": "중식" // 반점은 중국집
  },
  {
    "name": "애상마라탕&훠궈무한리필",
    "foodCategory": "중식" // 마라탕, 훠궈 전문점
  },
  {
    "name": "하루연어",
    "foodCategory": "일식" // 연어 전문점 (주로 일식 요리)
  },
  {
    "name": "삼일집",
    "foodCategory": "한식" // 일반 한식집 이름
  },
  {
    "name": "김삼철",
    "foodCategory": "한식" // 일반 한식집 이름
  },
  {
    "name": "깁미타코",
    "foodCategory": "양식" // 타코 전문점
  },
  {
    "name": "효자동솥뚜껑",
    "foodCategory": "한식" // 솥뚜껑 삼겹살 등 한식 고기집
  },
  {
    "name": "마장동고기집",
    "foodCategory": "한식" // 고기집은 한식으로 분류
  },
  {
    "name": "마로와플",
    "foodCategory": "기타" // 와플 전문점 (카페/디저트)
  },
  {
    "name": "라즈인도요리",
    "foodCategory": "기타" // 인도 요리 전문점
  },
  {
    "name": "일미양꼬치",
    "foodCategory": "중식" // 양꼬치 전문점
  },
  {
    "name": "신당명가",
    "foodCategory": "한식" // 분식 또는 한식류
  },
  {
    "name": "라스타",
    "foodCategory": "양식" // 파스타, 이탈리안
  },
  {
    "name": "전대별식",
    "foodCategory": "한식" // 백반/분식 등 한식류
  },
  {
    "name": "동산회관",
    "foodCategory": "한식" // 한식당 이름
  },
  {
    "name": "로니로티",
    "foodCategory": "양식" // 파스타, 스테이크 등
  },
  {
    "name": "쭈군",
    "foodCategory": "한식" // 쭈꾸미 전문점
  },
  {
    "name": "쭉심",
    "foodCategory": "한식" // 쭈꾸미 전문점 (쭈군과 유사)
  },
  {
    "name": "전대주먹구이",
    "foodCategory": "한식" // 고기집
  },
  {
    "name": "돼지똥꼬",
    "foodCategory": "한식" // 돼지고기 전문점 (곱창/막창 등)
  },
  {
    "name": "평이담백뼈칼국수",
    "foodCategory": "한식" // 칼국수 전문점
  },
  {
    "name": "서울깍두기",
    "foodCategory": "한식" // 곰탕/국밥 전문점
  },
  {
    "name": "만선",
    "foodCategory": "한식" // 해산물/회 (한식으로 분류)
  },
  {
    "name": "후토루",
    "foodCategory": "일식" // 후토마키 전문점
  },
  {
    "name": "월미당",
    "foodCategory": "한식" // 일식 같지만, 덮밥/면류 전문점으로 한식에 가까움
  },
  {
    "name": "페퍼콘",
    "foodCategory": "양식" // 레스토랑 이름 (보통 양식)
  },
  {
    "name": "산카쿠",
    "foodCategory": "일식" // 일본식 주점 또는 식당 이름
  },
  {
    "name": "정문 테스트용가게",
    "foodCategory": "일식" // 기존 요청대로 일식 유지
  }
];

module.exports = storesData;