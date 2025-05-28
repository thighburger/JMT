require('dotenv').config(); // dotenv 패키지로 환경 변수 로드

const Store = require('./models/Store');
const Menu = require('./models/Menu');
const mongoose = require('mongoose'); // connectDB를 위해 mongoose 추가
const connectDB = require('./config/db');
const menuData = require('./menus/키노리 전남대점.json'); // JSON 파일 import



const createStoreAndMenus = async function() {
  try {
    // 기존 데이터 확인
    const existingStore = await Store.findOne({ name: 'gl' });
    if (existingStore) {
      console.log('이미 데이터가 존재합니다.');
      return;
    }

    // 1. 가게 생성
    const store = await Store.create({
      name: '키노리',
      location: '광주 북구 호동로 9-1 1층',
      image: 'https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%ED%82%A4%EB%85%B8%EB%A6%AC+%EC%A0%84%EB%82%A8%EB%8C%80%EC%A0%90/%EB%8C%80%ED%91%9C%EC%82%AC%EC%A7%84.jpg',
      locationCategory: '후문',
      foodCategory: '일식',
      menus: []
    });

    // 2. 메뉴 생성
    const menus = await Menu.insertMany(
      menuData.map(menu => ({
        name: menu.name,
        price: parseInt(menu.price.replace(',', '')), // 문자열 가격을 숫자로 변환
        image: menu.image || null,
        likeCount: 0,
        heart: false,
        storeId: store._id
      }))
    );

    // 3. 가게에 메뉴 ID 저장
    store.menus = menus.map(menu => menu._id);
    await store.save();
    console.log('가게 및 메뉴 데이터 삽입 완료');
  } catch (err) {
    console.error('데이터 삽입 중 오류 발생:', err);
  }
};

const startServer = async () => {
  console.log('서버 시작 중...');
  try {
    connectDB(process.env.DB_URL); // DB 연결
    console.log('데이터베이스 연결 성공');
    
    createStoreAndMenus(); // 데이터 삽입
    console.log('데이터 삽입 완료');
  } catch (err) {
    console.error('서버 시작 중 오류 발생:', err);
    process.exit(1);
  }
};

startServer();

