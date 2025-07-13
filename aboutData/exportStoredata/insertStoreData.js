require('dotenv').config();
const mongoose = require('mongoose');
const Store = require('../../models/Store');
const Menu = require('../../models/Menu');

// 샘플 데이터: 실제로는 원하는 데이터를 아래 배열에 추가하세요.
const storesData = [
  {
    "name": "골목",
    "location": "광주 북구 용봉로 62-6 1층 골목(밥집술집)",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "일식",
    "menus": [
      {
        "name": "마늘새우크림카레",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/마늘새우크림카레.jpg"
      },
      {
        "name": "시금치카레",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/시금치카레.jpg"
      },
      {
        "name": "청양카레",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/청양카레.jpg"
      },
      {
        "name": "반반카레",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/반반카레.jpg"
      },
      {
        "name": "규동",
        "price": "9,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/규동.jpg"
      },
      {
        "name": "우동",
        "price": "6,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/우동.jpg"
      },
      {
        "name": "카츠동",
        "price": "9,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/카츠동.jpg"
      },
      {
        "name": "연어냉우동",
        "price": "14,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/연어냉우동.jpg"
      },
      {
        "name": "새우냉우동",
        "price": "13,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/새우냉우동.jpg"
      },
      {
        "name": "라멘",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/라멘.jpg"
      },
      {
        "name": "라멘 정식",
        "price": "14,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/라멘 정식.jpg"
      },
      {
        "name": "라멘 + 규동 SET",
        "price": "22,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/라멘 + 규동 SET.jpg"
      },
      {
        "name": "1인 SET",
        "price": "14,000",
        "image": null
      },
      {
        "name": "2인 SET",
        "price": "26,000",
        "image": null
      },
      {
        "name": "치킨 가라아게",
        "price": "10,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/골목 신안동 카레/치킨 가라아게.jpg"
      }
    ]
  },
  {
    "name": "맛드림김밥나라",
    "location": "광주 북구 자미로 56",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/맛드림김밥나라 전대1호점/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "제육김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "불고기김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "멸추김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "새우튀김김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "떡갈비김밥",
        "price": "4,500",
        "image": null
      }
    ]
  },
  {
    "name": "K2",
    "location": "광주 북구 용봉로 76",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/K2 신안동 돈가스/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "일식",
    "menus": [
      {
        "name": "돈까스",
        "price": "8,000",
        "image": null
      },
      {
        "name": "샐러드",
        "price": "6,000",
        "image": null
      },
      {
        "name": "포장 돈까스",
        "price": "8,300",
        "image": null
      },
      {
        "name": "포장 샐러드",
        "price": "6,300",
        "image": null
      }
    ]
  },
  {
    "name": "족발은못참치",
    "location": "광주 북구 자미로 68-6 1층",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/족발은못참치 신안동/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "기타",
    "menus": [
      {
        "name": "족발한개를 아낌없이 전부 썰어드립니다",
        "price": "29,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/족발은못참치 신안동/족발한개를 아낌없이 전부 썰어드립니다.jpg"
      },
      {
        "name": "매운불족 족발한개를 아낌없이썰어드려요",
        "price": "32,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/족발은못참치 신안동/매운불족 족발한개를 아낌없이썰어드려요.jpg"
      },
      {
        "name": "반반족발 족발한개를 아낌없이썰어드려요",
        "price": "32,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/족발은못참치 신안동/반반족발 족발한개를 아낌없이썰어드려요.jpg"
      }
    ]
  },
  {
    "name": "소중대",
    "location": "광주 북구 자미로66번길 15 1층",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "중식",
    "menus": [
      {
        "name": "고추짬뽕",
        "price": "11,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/고추짬뽕.jpg"
      },
      {
        "name": "고추짜장",
        "price": "8,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/고추짜장.jpg"
      },
      {
        "name": "고급탕수육(소)",
        "price": "25,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/고급탕수육(소).jpg"
      },
      {
        "name": "고급탕수육(중)",
        "price": "30,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/고급탕수육(중).jpg"
      },
      {
        "name": "고급탕수육(대)",
        "price": "35,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/고급탕수육(대).jpg"
      },
      {
        "name": "탕수육+짜장1+군만두+콜라",
        "price": "18,000",
        "image": null
      },
      {
        "name": "탕수육+짬뽕1+군만두+콜라",
        "price": "20,500",
        "image": null
      },
      {
        "name": "탕수육+고추짬뽕1+군만두+콜라",
        "price": "23,000",
        "image": null
      },
      {
        "name": "탕수육+고추국밥1+군만두+콜라",
        "price": "23,000",
        "image": null
      },
      {
        "name": "탕수육+고추짜장1+군만두+콜라",
        "price": "20,000",
        "image": null
      },
      {
        "name": "탕수육+짜장2+군만두+콜라",
        "price": "24,500",
        "image": null
      },
      {
        "name": "탕수육+짬뽕2+군만두+콜라",
        "price": "29,500",
        "image": null
      },
      {
        "name": "탕수육+고추짬뽕2+군만두+만두",
        "price": "34,500",
        "image": null
      },
      {
        "name": "탕수육+고추짜장2+군만두+콜라",
        "price": "28,500",
        "image": null
      },
      {
        "name": "탕수육+짬뽕1+짜장1+군만두+콜라",
        "price": "27,000",
        "image": null
      },
      {
        "name": "짜장면",
        "price": "6,500",
        "image": null
      },
      {
        "name": "직접갈아만든 검정콩국수",
        "price": "9,500",
        "image": null
      },
      {
        "name": "삼선짬뽕",
        "price": "11,500",
        "image": null
      },
      {
        "name": "차돌국밥",
        "price": "11,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/차돌국밥.jpg"
      },
      {
        "name": "고추국밥",
        "price": "11,500",
        "image": null
      },
      {
        "name": "얼큰육계장",
        "price": "10,000",
        "image": null
      },
      {
        "name": "볶음밥",
        "price": "8,500",
        "image": null
      },
      {
        "name": "잡채밥",
        "price": "10,000",
        "image": null
      },
      {
        "name": "고급군만두",
        "price": "8,000",
        "image": null
      },
      {
        "name": "양장피(짬뽕국물400ml)(중)",
        "price": "33,000",
        "image": null
      },
      {
        "name": "양장피(짬뽕국물400ml)(대)",
        "price": "43,000",
        "image": null
      },
      {
        "name": "팔보채+(짬뽕국물400ml)(중)",
        "price": "33,000",
        "image": null
      },
      {
        "name": "팔보채+(짬뽕국물400ml)(대)",
        "price": "43,000",
        "image": null
      },
      {
        "name": "콜라500ml",
        "price": "2,000",
        "image": null
      },
      {
        "name": "사이다500ml",
        "price": "2,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/사이다500ml.jpg"
      },
      {
        "name": "콜라1.25L",
        "price": "3,000",
        "image": null
      },
      {
        "name": "환타500ml",
        "price": "2,500",
        "image": null
      },
      {
        "name": "생수(500ml)",
        "price": "1,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/소중대 신안동/생수(500ml).jpg"
      },
      {
        "name": "탕수육+검정콩국수2+군만두+콜라",
        "price": "30,500",
        "image": null
      },
      {
        "name": "탕수육+검정콩국수1+군만두+콜라",
        "price": "21,000",
        "image": null
      }
    ]
  },
  {
    "name": "1992덮밥&짜글이",
    "location": "광주 북구 자미로66번길 21",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "듬뿍짜글이",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/듬뿍짜글이.jpg"
      },
      {
        "name": "마약고추장돼지덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/마약고추장돼지덮밥.jpg"
      },
      {
        "name": "1992 마약짜글이",
        "price": "19,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/1992 마약짜글이.jpg"
      },
      {
        "name": "된장짜글이",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/된장짜글이.jpg"
      },
      {
        "name": "전주식비빔밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/전주식비빔밥.jpg"
      },
      {
        "name": "매콤쭈꾸미덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/매콤쭈꾸미덮밥.jpg"
      },
      {
        "name": "마약육회덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/마약육회덮밥.jpg"
      },
      {
        "name": "된장삼겹덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/된장삼겹덮밥.jpg"
      },
      {
        "name": "마약소대창덮밥",
        "price": "14,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/마약소대창덮밥.jpg"
      },
      {
        "name": "돈가스덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/돈가스덮밥.jpg"
      },
      {
        "name": "양념깐새우무침덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/양념깐새우무침덮밥.jpg"
      },
      {
        "name": "김치고기덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/김치고기덮밥.jpg"
      },
      {
        "name": "해물쌈장돼지덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/해물쌈장돼지덮밥.jpg"
      },
      {
        "name": "마늘데리야끼우삼겹덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/마늘데리야끼우삼겹덮밥.jpg"
      },
      {
        "name": "닭갈비덮밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/1992덮밥&짜글이 전남대점/닭갈비덮밥.jpg"
      }
    ]
  },
  {
    "name": "모돈",
    "location": "광주 북구 자미로66번길 10 . 1층",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/모돈 신안동 돼지/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "삼겹살.목살.양념갈비.무뼈닭발",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/모돈 신안동 돼지/삼겹살.목살.양념갈비.무뼈닭발.jpg"
      },
      {
        "name": "생오겹살",
        "price": "13,000",
        "image": null
      },
      {
        "name": "가브리살",
        "price": "14,000",
        "image": null
      },
      {
        "name": "항정살",
        "price": "14,000",
        "image": null
      },
      {
        "name": "등갈비소금구이",
        "price": "14,000",
        "image": null
      },
      {
        "name": "모듬스페셜",
        "price": "40,000",
        "image": null
      }
    ]
  },
  {
    "name": "진막창과오돌뼈",
    "location": "광주 북구 신흥로27번길 50",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/진막창과오돌뼈/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "오돌뼈 (170g)",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/진막창과오돌뼈/오돌뼈 (170g).jpg"
      },
      {
        "name": "막창 (170g)",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/진막창과오돌뼈/막창 (170g).jpg"
      },
      {
        "name": "목살 (170g)",
        "price": "15,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/진막창과오돌뼈/목살 (170g).jpg"
      },
      {
        "name": "삼겹살 (170g)",
        "price": "15,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/진막창과오돌뼈/삼겹살 (170g).jpg"
      },
      {
        "name": "갈매기살 (170g)",
        "price": "15,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/진막창과오돌뼈/갈매기살 (170g).jpg"
      }
    ]
  },
  {
    "name": "깨순이김밥",
    "location": "광주 북구 자미로 60",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/깨순이김밥 전대정문점/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "매운고추김밥",
        "price": "4,000",
        "image": null
      },
      {
        "name": "참치김치덮밥",
        "price": "8,000",
        "image": null
      },
      {
        "name": "소고기덮밥",
        "price": "8,000",
        "image": null
      },
      {
        "name": "깨순이김밥",
        "price": "3,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/깨순이김밥 전대정문점/깨순이김밥.jpg"
      },
      {
        "name": "참치마요네즈김밥",
        "price": "4,000",
        "image": null
      },
      {
        "name": "참치김치김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "김치치즈김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "치즈김밥",
        "price": "4,000",
        "image": null
      },
      {
        "name": "참치매운고추김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "새우튀김김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "멸추김밥",
        "price": "4,500",
        "image": null
      },
      {
        "name": "소고기김밥",
        "price": "4,000",
        "image": null
      },
      {
        "name": "김치김밥",
        "price": "4,000",
        "image": null
      },
      {
        "name": "샐러드김밥",
        "price": "4,000",
        "image": null
      }
    ]
  },
  {
    "name": "갓튀긴후라이드",
    "location": "광주 북구 자미로 64 . 1층",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "기타",
    "menus": [
      {
        "name": "[겉바속촉] 갓튀긴후라이드",
        "price": "18,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[겉바속촉] 갓튀긴후라이드.jpg"
      },
      {
        "name": "듬뿍 슈뿌림",
        "price": "21,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/듬뿍 슈뿌림.jpg"
      },
      {
        "name": "반반 치킨",
        "price": "18,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/반반 치킨.jpg"
      },
      {
        "name": "듬뿍 꼬추마요",
        "price": "21,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/듬뿍 꼬추마요.jpg"
      },
      {
        "name": "[NEW] 듬뿍 땡초마요",
        "price": "21,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 듬뿍 땡초마요.jpg"
      },
      {
        "name": "[NEW] 듬뿍 까망 알리오",
        "price": "21,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 듬뿍 까망 알리오.jpg"
      },
      {
        "name": "[NEW] 듬뿍 뽀얀 어니언",
        "price": "21,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 듬뿍 뽀얀 어니언.jpg"
      },
      {
        "name": "[NEW] 갓 튀긴 콤보",
        "price": "22,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 갓 튀긴 콤보.jpg"
      },
      {
        "name": "갓 튀긴 윙 & 봉(윙봉)",
        "price": "21,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 튀긴 윙 & 봉(윙봉).jpg"
      },
      {
        "name": "양념치킨",
        "price": "19,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/양념치킨.jpg"
      },
      {
        "name": "매운 양념치킨",
        "price": "19,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/매운 양념치킨.jpg"
      },
      {
        "name": "반반치킨 + 양념감자튀김",
        "price": "23,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/반반치킨 + 양념감자튀김.jpg"
      },
      {
        "name": "반반치킨 + 똥집",
        "price": "23,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/반반치킨 + 똥집.jpg"
      },
      {
        "name": "반반치킨 + 염통꼬치(8개)",
        "price": "23,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/반반치킨 + 염통꼬치(8개).jpg"
      },
      {
        "name": "반반치킨 + 갓 만든 떡볶이",
        "price": "23,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/반반치킨 + 갓 만든 떡볶이.jpg"
      },
      {
        "name": "갓 튀긴 두마리",
        "price": "32,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 튀긴 두마리.jpg"
      },
      {
        "name": "2마리 세가지맛",
        "price": "32,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/2마리 세가지맛.jpg"
      },
      {
        "name": "2마리 네가지맛",
        "price": "32,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/2마리 네가지맛.jpg"
      },
      {
        "name": "갓 튀긴 후라이드 (반마리)((콜라 미포함))",
        "price": "12,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 튀긴 후라이드 (반마리)((콜라 미포함)).jpg"
      },
      {
        "name": "[NEW] 듬뿍 땡초마요 (반마리)((콜라 미포함))",
        "price": "15,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 듬뿍 땡초마요 (반마리)((콜라 미포함)).jpg"
      },
      {
        "name": "[NEW] 듬뿍 까망 알리오 (반마리)",
        "price": "15,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 듬뿍 까망 알리오 (반마리).jpg"
      },
      {
        "name": "[NEW] 듬뿍 뽀얀 어니언 (반마리)",
        "price": "15,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 듬뿍 뽀얀 어니언 (반마리).jpg"
      },
      {
        "name": "듬뿍 꼬추마요 (반마리)((콜라 미포함))",
        "price": "15,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/듬뿍 꼬추마요 (반마리)((콜라 미포함)).jpg"
      },
      {
        "name": "[NEW] 갓 튀긴 튤립닭발",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/[NEW] 갓 튀긴 튤립닭발.jpg"
      },
      {
        "name": "치즈볼(4개)",
        "price": "4,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/치즈볼(4개).jpg"
      },
      {
        "name": "범벅 치즈볼(4개)",
        "price": "4,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/범벅 치즈볼(4개).jpg"
      },
      {
        "name": "갓 만든 떡볶이",
        "price": "5,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 만든 떡볶이.jpg"
      },
      {
        "name": "갓 만든 로제 떡볶이",
        "price": "6,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 만든 로제 떡볶이.jpg"
      },
      {
        "name": "갓 내린 파채 (파채소스)",
        "price": "1,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 내린 파채 (파채소스).jpg"
      },
      {
        "name": "갓 내린 파채 (파닭소스)",
        "price": "1,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 내린 파채 (파닭소스).jpg"
      },
      {
        "name": "건강한 비트무",
        "price": "500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/건강한 비트무.jpg"
      },
      {
        "name": "뿌려먹는 시즈닝 추가",
        "price": "500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/뿌려먹는 시즈닝 추가.jpg"
      },
      {
        "name": "양념소스 추가",
        "price": "500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/양념소스 추가.jpg"
      },
      {
        "name": "코카콜라 500ml",
        "price": "1,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/코카콜라 500ml.jpg"
      },
      {
        "name": "코카콜라 ZERO 500ml",
        "price": "1,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/코카콜라 ZERO 500ml.jpg"
      },
      {
        "name": "코카콜라 1.25L",
        "price": "2,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/코카콜라 1.25L.jpg"
      },
      {
        "name": "코카콜라 ZERO 1.25L",
        "price": "2,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/코카콜라 ZERO 1.25L.jpg"
      },
      {
        "name": "갓 지은 햇반(1 그릇)",
        "price": "2,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/갓튀긴후라이드 전남대점/갓 지은 햇반(1 그릇).jpg"
      }
    ]
  },
  {
    "name": "오향당",
    "location": "광주 북구 서양로 33 오향당",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/오향당 전대정문/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "기타",
    "menus": [
      {
        "name": "오향닭구이",
        "price": "11,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/오향당 전대정문/오향닭구이.jpg"
      },
      {
        "name": "숯불 무뼈닭발",
        "price": "11,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/오향당 전대정문/숯불 무뼈닭발.jpg"
      },
      {
        "name": "오향 돼지구이",
        "price": "12,900",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/오향당 전대정문/오향 돼지구이.jpg"
      },
      {
        "name": "물냉면 비빔냉면",
        "price": "5,500",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/오향당 전대정문/물냉면 비빔냉면.jpg"
      },
      {
        "name": "닭 특수부위 3종",
        "price": "12,900",
        "image": null
      }
    ]
  },
  {
    "name": "본가네국밥",
    "location": "광주 북구 서양로 37 1층 원조 본가네국밥",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/본가네국밥 신안동/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "삼계탕(여름한정 메뉴)",
        "price": "17,000",
        "image": null
      },
      {
        "name": "머리국밥",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/본가네국밥 신안동/머리국밥.jpg"
      },
      {
        "name": "머리국밥(특)",
        "price": "11,000",
        "image": null
      },
      {
        "name": "모둠국밥",
        "price": "10,000",
        "image": null
      },
      {
        "name": "순대국밥",
        "price": "9,000",
        "image": null
      },
      {
        "name": "내장국밥",
        "price": "9,000",
        "image": null
      },
      {
        "name": "살코기국밥",
        "price": "9,000",
        "image": null
      },
      {
        "name": "암뽕순대국밥",
        "price": "10,000",
        "image": null
      },
      {
        "name": "머리고기수육(중)",
        "price": "25,000",
        "image": null
      },
      {
        "name": "머리고기수육(대)",
        "price": "30,000",
        "image": null
      },
      {
        "name": "모둠수육",
        "price": "30,000",
        "image": null
      },
      {
        "name": "곱창전골(중)",
        "price": "25,000",
        "image": null
      },
      {
        "name": "곱창전골(대)",
        "price": "30,000",
        "image": null
      },
      {
        "name": "암뽕순대",
        "price": "15,000",
        "image": null
      },
      {
        "name": "찰순대",
        "price": "10,000",
        "image": null
      }
    ]
  },
  {
    "name": "퓨전영수부영통닭",
    "location": "광주 북구 자미로66번길 14 1층 퓨전부영통닭",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "기타",
    "menus": [
      {
        "name": "후라이드",
        "price": "22,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/후라이드.jpg"
      },
      {
        "name": "양념",
        "price": "23,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/양념.jpg"
      },
      {
        "name": "간장",
        "price": "23,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/간장.jpg"
      },
      {
        "name": "순살후라이드",
        "price": "22,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/순살후라이드.jpg"
      },
      {
        "name": "순살 양념",
        "price": "23,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/순살 양념.jpg"
      },
      {
        "name": "똥집",
        "price": "22,000",
        "image": null
      },
      {
        "name": "매운양념치킨",
        "price": "24,000",
        "image": null
      },
      {
        "name": "후라이드+양념",
        "price": "23,000",
        "image": null
      },
      {
        "name": "후라이드+간장",
        "price": "23,000",
        "image": null
      },
      {
        "name": "간장+양념",
        "price": "24,000",
        "image": null
      },
      {
        "name": "간장+매운양념",
        "price": "26,000",
        "image": null
      },
      {
        "name": "간장+매운간장",
        "price": "26,000",
        "image": null
      },
      {
        "name": "후라이드+양념+간장",
        "price": "25,000",
        "image": null
      },
      {
        "name": "후라이드+양념+매운간장",
        "price": "27,000",
        "image": null
      },
      {
        "name": "후라이드+매운양념+간장",
        "price": "27,000",
        "image": null
      },
      {
        "name": "순살후라이드 + 간장 + 겨자맛양념",
        "price": "29,000",
        "image": null
      },
      {
        "name": "순살 간장",
        "price": "23,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/순살 간장.jpg"
      },
      {
        "name": "순살겨자맛양념",
        "price": "26,000",
        "image": null
      },
      {
        "name": "순살 후라이드+순살 양념",
        "price": "23,000",
        "image": null
      },
      {
        "name": "순살 후라이드+순살 간장",
        "price": "23,000",
        "image": null
      },
      {
        "name": "순살 간장+순살 양념",
        "price": "24,000",
        "image": null
      },
      {
        "name": "순살 간장+순살 매운양념",
        "price": "26,000",
        "image": null
      },
      {
        "name": "순살 간장+순살 매운간장",
        "price": "26,000",
        "image": null
      },
      {
        "name": "순살 후라이드+순살 양념+순살 간장",
        "price": "25,000",
        "image": null
      },
      {
        "name": "순살 후라이드+순살 양념+순살 매운간장",
        "price": "27,000",
        "image": null
      },
      {
        "name": "순살 후라이드+순살 매운양념+순살 간장",
        "price": "27,000",
        "image": null
      },
      {
        "name": "순살매운양념",
        "price": "19,000",
        "image": null
      },
      {
        "name": "순살 매운간장",
        "price": "19,000",
        "image": null
      },
      {
        "name": "음료 1.25 변경(1.25 변경)",
        "price": "4,000",
        "image": null
      },
      {
        "name": "감자튀김",
        "price": "6,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/퓨전영수부영통닭 전남대점/감자튀김.jpg"
      },
      {
        "name": "치킨무",
        "price": "500",
        "image": null
      },
      {
        "name": "사이다 1.25 변경(1.25L 변경)",
        "price": "4,000",
        "image": null
      }
    ]
  },
  {
    "name": "도향",
    "location": "광주 북구 서양로41번길 20 1층",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "중식",
    "menus": [
      {
        "name": "도향콩물(여름시즌메뉴)",
        "price": "10,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/도향콩물(여름시즌메뉴).jpg"
      },
      {
        "name": "도향짜장",
        "price": "7,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/도향짜장.jpg"
      },
      {
        "name": "도향짬뽕",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/도향짬뽕.jpg"
      },
      {
        "name": "차돌비빔짬뽕",
        "price": "12,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/차돌비빔짬뽕.jpg"
      },
      {
        "name": "찹쌀탕수육(소)",
        "price": "20,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/찹쌀탕수육(소).jpg"
      },
      {
        "name": "간짜장",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/간짜장.jpg"
      },
      {
        "name": "해물볶음간짜장",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/해물볶음간짜장.jpg"
      },
      {
        "name": "통낙지매운해물짬뽕",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/통낙지매운해물짬뽕.jpg"
      },
      {
        "name": "우삼겹짬뽕",
        "price": "12,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/우삼겹짬뽕.jpg"
      },
      {
        "name": "도향우동",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/도향우동.jpg"
      },
      {
        "name": "도향볶음밥",
        "price": "9,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/도향볶음밥.jpg"
      },
      {
        "name": "게살볶음밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/게살볶음밥.jpg"
      },
      {
        "name": "홍콩식볶음밥",
        "price": "12,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/홍콩식볶음밥.jpg"
      },
      {
        "name": "잡채밥",
        "price": "11,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/잡채밥.jpg"
      },
      {
        "name": "해물잡탕밥",
        "price": "13,000",
        "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/도향 전남대점/해물잡탕밥.jpg"
      }
    ]
  },
  {
    "name": "오리나라만세",
    "location": "광주 북구 용봉로 100-1",
    "image": "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/오리나라만세/대표사진.jpg",
    "locationCategory": "정문",
    "foodCategory": "한식",
    "menus": [
      {
        "name": "오리탕",
        "price": "9,000",
        "image": null
      },
      {
        "name": "오리주물럭",
        "price": "10,000",
        "image": null
      },
      {
        "name": "김치찌개",
        "price": "9,000",
        "image": null
      },
      {
        "name": "삼겹살",
        "price": "13,000",
        "image": null
      }
    ]
  }
];

async function insertStoresWithMenus() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  for (const storeData of storesData) {
    // 1. Store를 메뉴 없이 먼저 생성
    const storeDoc = new Store({
      name: storeData.name,
      location: storeData.location,
      image: storeData.image,
      isAllowed: storeData.isAllowed,
      locationCategory: storeData.locationCategory,
      foodCategory: storeData.foodCategory,
      menus: []
    });
    await storeDoc.save();

    // 2. 메뉴 생성 (storeId 참조 포함)
    const menuDocs = [];
    for (const menu of storeData.menus) {
      // 가격이 문자열일 경우 숫자로 변환 (예: "5,500" -> 5500)
      let price = menu.price;
      if (typeof price === 'string') {
        price = Number(price.replace(/,/g, ''));
      }
      const menuDoc = new Menu({
        name: menu.name,
        price: price,
        image: menu.image,
        storeId: storeDoc._id
      });
      await menuDoc.save();
      menuDocs.push(menuDoc._id);
    }

    // 3. Store의 menus 필드 업데이트
    storeDoc.menus = menuDocs;
    await storeDoc.save();
    console.log(`✅ 저장 완료: ${storeDoc.name}`);
  }
  await mongoose.disconnect();
  console.log('--- 모든 데이터 저장 완료! ---');
}

insertStoresWithMenus().catch(err => {
  console.error('에러 발생:', err);
  mongoose.disconnect();
});
