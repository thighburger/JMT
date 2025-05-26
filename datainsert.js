require('dotenv').config(); // dotenv 패키지로 환경 변수 로드

const Store = require('./models/Store');
const Menu = require('./models/Menu');
const mongoose = require('mongoose'); // connectDB를 위해 mongoose 추가
const connectDB = require('./config/db');



const createStoreAndMenus = async function() {
  try {
    // 기존 데이터 확인
    const existingStore = await Store.findOne({ name: '알촌' });
    if (existingStore) {
      console.log('이미 데이터가 존재합니다.');
      return;
    }

    // 1. 가게 생성
    const store = await Store.create({
      name: '알촌',
      location: '서울 마포구 어딘가',
      image: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200522_277%2F1590127337990iktev_JPEG%2Fau4DD3tuOowYoPM7sMtjnza5.jpg',
      likeSum: 25,
      locationCategory: '홍대',
      foodCategory: '한식',
      menus: []
    });

    // 2. 메뉴 생성
    const menus = await Menu.insertMany([
      {
        name: '기본메뉴',
        price: 5800,
        image: 'http://file.smartbaedal.com/usr/menuitm/2013/6/20/201306201627_b01_1280.jpg',
        likeCount: 13,
        heart: false,
        storeId: store._id
      },
      {
        name: '치즈메뉴',
        price: 6800,
        image: 'http://imagefarm.baemin.com/smartmenuimage/image_library/20210422/r_437.jpg',
        likeCount: 8,
        heart: false,
        storeId: store._id
      },
      {
        name: '갈릭메뉴',
        price: 6600,
        image: 'http://file.smartbaedal.com/usr/menuitm/2017/11/16/715745_286_20171116094723.jpg',
        likeCount: 6,
        heart: false,
        storeId: store._id
      }
    ]);

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

