require('dotenv').config(); // dotenv 패키지로 환경 변수 로드

const Store = require('./models/Store');
const Menu = require('./models/Menu');
const mongoose = require('mongoose'); // connectDB를 위해 mongoose 추가
const connectDB = require('./config/db');
const storesData = require('./data'); // 여러 가게 데이터가 담긴 JSON 파일 import



const createStoresAndMenus = async function() {
  try {
    for (const storeData of storesData) {
      // 기존 데이터 확인
      const existingStore = await Store.findOne({ name: storeData.name });
      if (existingStore) {
        console.log(`${storeData.name} 데이터가 이미 존재합니다.`);
        continue;
      }
      // 1. 가게 생성
      const store = await Store.create({
        name: storeData.name,
        location: storeData.location,
        image: storeData.image,
        locationCategory: storeData.locationCategory,
        foodCategory: storeData.foodCategory,
        menus: []
      });
      // 2. 메뉴 생성
      const menus = await Menu.insertMany(
        (storeData.menus || []).map(menu => ({
          name: menu.name,
          price: parseInt((menu.price || '0').replace(',', '')),
          image: menu.image || null,
          likeCount: 0,
          heart: false,
          storeId: store._id
        }))
      );
      // 3. 가게에 메뉴 ID 저장
      store.menus = menus.map(menu => menu._id);
      await store.save();
      console.log(`${storeData.name} 및 메뉴 데이터 삽입 완료`);
    }
  } catch (err) {
    console.error('데이터 삽입 중 오류 발생:', err);
  }
};

const startServer = async () => {
  console.log('서버 시작 중...');
  try {
    connectDB(process.env.DB_URL); // DB 연결
    console.log('데이터베이스 연결 성공');
    await createStoresAndMenus(); // 데이터 삽입
    console.log('데이터 삽입 완료');
  } catch (err) {
    console.error('서버 시작 중 오류 발생:', err);
    process.exit(1);
  }
};

startServer();

