
// 이 파일은 MongoDB에서 추출된 가게 데이터를 포함합니다.
// 자동 생성된 파일이므로 직접 수정하지 않는 것이 좋습니다.

const storesData = [
  {
    "name": "노릇노릇 식당",
    "foodCategory": "한식"
  },
  {
    "name": "소코아",
    "foodCategory": "일식"
  },
  {
    "name": "알촌",
    "foodCategory": "한식"
  },
  {
    "name": "천지연삼겹살",
    "foodCategory": "한식"
  },
  {
    "name": "키노리",
    "foodCategory": "일식"
  },
  {
    "name": "동흥루",
    "foodCategory": "중식"
  },
  {
    "name": "가마솥옛날국밥",
    "foodCategory": "한식" // 국밥은 한식
  },
  {
    "name": "오븐마루치킨",
    "foodCategory": "기타" // 치킨은 독립적인 분류 또는 기타
  },
  {
    "name": "생돈까스",
    "foodCategory": "일식" // 돈까스는 일식 또는 일식/양식 퓨전으로 볼 수 있으나 보통 일식으로 분류
  },
  {
    "name": "도스마스",
    "foodCategory": "양식" // 멕시칸(부리또, 타코)은 양식
  },
  {
    "name": "통큰 쭈꾸미",
    "foodCategory": "한식" // 쭈꾸미는 한식
  },
  {
    "name": "카츠앤맘",
    "foodCategory": "일식" // 카츠(돈카츠)는 일식
  },
  {
    "name": "수진식당",
    "foodCategory": "한식" // '수진식당'은 식당 이름만으로는 특정 불가, 보편적인 식당은 한식으로 판단
  },
  {
    "name": "마라미녀마라탕",
    "foodCategory": "중식" // 마라탕은 중식
  },
  {
    "name": "테이스티",
    "foodCategory": "기타" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "전대맛칼국수",
    "foodCategory": "한식" // 칼국수는 한식
  },
  {
    "name": "무등골금호식당",
    "foodCategory": "한식" // 식당 이름만으로는 특정 불가, 한식으로 판단 (보통 백반류)
  },
  {
    "name": "잇샌드",
    "foodCategory": "양식" // 샌드위치는 양식
  },
  {
    "name": "찐한사골국밥",
    "foodCategory": "한식" // 국밥은 한식
  },
  {
    "name": "금룡황제쟁반짜장",
    "foodCategory": "중식" // 짜장은 중식
  },
  {
    "name": "만계치킨",
    "foodCategory": "기타" // 치킨은 독립적인 분류 또는 기타
  },
  {
    "name": "엄니손맛",
    "foodCategory": "한식" // '손맛'은 한식 느낌
  },
  {
    "name": "온오프피자",
    "foodCategory": "양식" // 피자는 양식
  },
  {
    "name": "북경깐풍기",
    "foodCategory": "중식" // 깐풍기는 중식
  },
  {
    "name": "안탈야케밥",
    "foodCategory": "기타" // 케밥은 터키 음식 (기타로 분류)
  },
  {
    "name": "원조 안동찜닭",
    "foodCategory": "한식" // 안동찜닭은 한식
  },
  {
    "name": "그린데이",
    "foodCategory": "기타" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "벤또스시",
    "foodCategory": "일식" // 스시는 일식
  },
  {
    "name": "고을나주곰탕",
    "foodCategory": "한식" // 곰탕은 한식
  },
  {
    "name": "피자브라더스",
    "foodCategory": "양식" // 피자는 양식
  },
  {
    "name": "마니마니",
    "foodCategory": "기타" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "줄벼락",
    "foodCategory": "한식" // 이름만으로는 특정 불가, 음식점 이름으로 흔한 경우 한식으로 판단
  },
  {
    "name": "대풍수",
    "foodCategory": "중식" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "뽀글이와돌돌이",
    "foodCategory": "분식" // 떡볶이, 튀김 등 분식류 연상 (추정)
  },
  {
    "name": "샤브향",
    "foodCategory": "한식" // 샤브샤브 전문점 (보통 한식, 월남쌈 등 포함)
  },
  {
    "name": "스피드반점",
    "foodCategory": "중식" // 반점은 중식
  },
  {
    "name": "송고집",
    "foodCategory": "한식" // 이름만으로는 특정 불가, '고집'은 한식 느낌
  },
  {
    "name": "애상마라탕&훠궈무한리필",
    "foodCategory": "중식" // 마라탕, 훠궈는 중식
  },
  {
    "name": "하루연어",
    "foodCategory": "일식" // 연어는 일식
  },
  {
    "name": "삼일집",
    "foodCategory": "한식" // 이름만으로는 특정 불가, 한식으로 판단
  },
  {
    "name": "김삼철",
    "foodCategory": "한식" // 이름만으로는 특정 불가, 사람 이름이 들어간 식당은 보통 한식
  },
  {
    "name": "깁미타코",
    "foodCategory": "양식" // 타코는 양식 (멕시칸)
  },
  {
    "name": "효자동솥뚜껑",
    "foodCategory": "한식" // 솥뚜껑 삼겹살 등 연상, 한식
  },
  {
    "name": "마장동고기집",
    "foodCategory": "한식" // 고기집은 한식
  },
  {
    "name": "마로와플",
    "foodCategory": "양식" // 와플은 양식 (디저트/간식류)
  },
  {
    "name": "라즈인도요리",
    "foodCategory": "기타" // 인도 요리는 기타
  },
  {
    "name": "일미양꼬치",
    "foodCategory": "중식" // 양꼬치는 중식
  },
  {
    "name": "신당명가",
    "foodCategory": "분식" // 이름만으로는 특정 불가, 한식으로 판단
  },
  {
    "name": "라스타",
    "foodCategory": "한식" // 파스타 전문점 연상 (추정)
  },
  {
    "name": "전대별식",
    "foodCategory": "일식" // 별미, 별식은 보통 한식
  },
  {
    "name": "동산회관",
    "foodCategory": "한식" // 회관은 보통 한식 전문점
  },
  {
    "name": "로니로티",
    "foodCategory": "양식" // 양식 체인점
  },
  {
    "name": "쭈군",
    "foodCategory": "한식" // 쭈꾸미 요리 연상, 한식
  },
  {
    "name": "쭉심",
    "foodCategory": "한식" // 쭈꾸미 요리 연상, 한식
  },
  {
    "name": "전대주먹구이",
    "foodCategory": "한식" // 주먹구이 (고기)는 한식
  },
  {
    "name": "돼지똥꼬",
    "foodCategory": "한식" // 돼지고기 전문점, 한식
  },
  {
    "name": "매코미통닭발",
    "foodCategory": "한식" // 닭발은 한식
  },
  {
    "name": "평이담백뼈칼국수",
    "foodCategory": "한식" // 칼국수는 한식
  },
  {
    "name": "서울깍두기",
    "foodCategory": "한식" // 설렁탕, 국밥 전문점, 한식
  },
  {
    "name": "만선",
    "foodCategory": "한식" // 이름만으로는 특정 불가, 한식으로 판단
  },
  {
    "name": "후토루",
    "foodCategory": "일식" // 후토마키 전문점 연상 (추정)
  },
  {
    "name": "다다",
    "foodCategory": "일식" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "월미당",
    "foodCategory": "한식" // 돈까스/칼국수 등 파는 곳으로 연상 (추정, 한식 계열)
  },
  {
    "name": "페퍼콘",
    "foodCategory": "양식" // 이름에서 양식 느낌
  },
  {
    "name": "뼈대있는집",
    "foodCategory": "한식" // 뼈해장국 등 한식 메뉴 연상
  },
  {
    "name": "산카쿠",
    "foodCategory": "일식" // 일식 이자카야 또는 식당 이름
  },
  {
    "name": "오늘하루가",
    "foodCategory": "일식" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "스테이_STAY",
    "foodCategory": "양식" // 이름만으로는 특정 불가, 기타
  },
  {
    "name": "정문 가게 테스트용",
    "foodCategory": "기타" // 테스트용이므로 기타
  }
];

module.exports = storesData;
