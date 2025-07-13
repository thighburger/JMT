require('dotenv').config(); // dotenv 패키지로 환경 변수 로드

const Store = require('../../models/Store');
const Menu = require('../../models/Menu');
const mongoose = require('mongoose'); // connectDB를 위해 mongoose 추가
const storeUpdates=require('./storesData');
const connectDB=require('../../config/db');

// DB 연결
connectDB(process.env.DB_URL);

// 예시 데이터: 변경할 가게 목록과 새 카테고리
  
  async function updateMultipleStores() {
    console.log("가게 정보 업데이트를 시작합니다...");
    for (const store of storeUpdates) {
        try {
            // Mongoose 모델을 사용하여 업데이트 (Store.updateOne)
            const result = await Store.updateOne(
                { name: store.name },
                { $set: {
                    foodCategory: store.foodCategory,
                    locationCategory: store.locationCategory
                } }
            );

            if (result.matchedCount > 0) {
                console.log(`✅ "${store.name}"의 foodCategory를 "${store.foodCategory}"로 업데이트했습니다.`);
            } else {
                console.warn(`⚠️ "${store.name}"을(를) 찾을 수 없어 업데이트하지 못했습니다.`);
            }
        } catch (error) {
            console.error(`❌ "${store.name}" 업데이트 중 오류 발생:`, error);
        }
    }
        console.log("--- 모든 가게 업데이트 완료! ---");
};
  
  const startServer = async () => {
    console.log('서버 시작 중...');
    try {
      connectDB(process.env.DB_URL); // DB 연결
      console.log('데이터베이스 연결 성공');
      await updateMultipleStores(); // 데이터 삽입
      console.log('데이터 삽입 완료');
    } catch (err) {
      console.error('서버 시작 중 오류 발생:', err);
      process.exit(1);
    }
  };
  
  startServer();