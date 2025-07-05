require('dotenv').config();

const Store = require('./models/Store');
const Menu = require('./models/Menu');
const mongoose = require('mongoose');
const storeUpdates = require('./storesData');
const connectDB = require('./config/db');
const isAllowedStore = require('./allowedStoreData');

// DB 연결
connectDB(process.env.DB_URL);

async function updateImgUrl() {
    console.log("이미지 설정을 시작합니다...");
    
    // isAllowedStore 배열의 각 가게 이름에 대해 처리
    for (const storeName of isAllowedStore) {
        try {
            // 1. 가게 조회
            const store = await Store.findOne({ name: storeName });

            if (!store) {
                console.log(`❌ 가게를 찾을 수 없습니다: ${storeName}`);
                continue;
            }

            // 2. 가게의 displayedImg 및 isAllowed 업데이트
            const storeImageUrl = store.image; // 가게 image 사용
            
            await Store.updateOne(
                { _id: store._id },
                { $set: { displayedImg: storeImageUrl, isAllowed: true } }
            );
            console.log(`✅ 가게 이미지 및 허용 상태 업데이트 완료: ${store.name}`);

            // 3. 가게 메뉴들의 displayedImg 업데이트
            if (store.menus && store.menus.length > 0) {
                // 메뉴별로 조회하여 각 메뉴의 image를 displayedImg로 설정
                for (const menuId of store.menus) {
                    const menu = await Menu.findById(menuId);
                    if (menu) {
                        await Menu.updateOne(
                            { _id: menuId },
                            { $set: { displayedImg: menu.image } } // 메뉴의 image를 displayedImg로 설정
                        );
                        console.log(`   └ 메뉴 이미지 업데이트 완료: ${menu.name}`);
                    } else {
                        console.log(`   └ 메뉴를 찾을 수 없음: ${menuId}`);
                    }
                }
            } else {
                console.log(`   └ 메뉴 없음: ${store.name}`);
            }

        } catch (error) {
            console.error(`❌ ${storeName} 가게 이미지 업데이트 중 오류 발생:`, error);
        }
    }
    console.log("--- 모든 이미지 업데이트 완료! ---");
    mongoose.disconnect(); 
}

const startServer = async () => {
    console.log('서버 시작 중...');
    try {
        console.log('데이터베이스 연결 성공');
        await updateImgUrl();
        console.log('이미지 업데이트 프로세스 완료'); 
    } catch (err) {
        console.error('서버 시작 중 오류 발생:', err);
        process.exit(1);
    }
};

startServer();