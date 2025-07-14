require('dotenv').config();

const Store = require('../../models/Store');
const Menu = require('../../models/Menu');
const mongoose = require('mongoose');
const connectDB = require('../../config/db');
const isAllowedStore = require('./allowedStoreData');

// DB 연결
connectDB(process.env.DB_URL);
DEFAULT_IMG_URL = "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EA%B0%80%EA%B2%8C%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-04+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+9.55.05.png";

async function updateImgUrl() {
    console.log("이미지 설정을 시작합니다...");
    
    // DB의 모든 가게에 대해 처리
    const stores = await Store.find();
    for (const store of stores) {
        try {
            // 1. image가 null이면 DEFAULT_IMG_URL로 먼저 업데이트
            let storeImageUrl = store.image;
            if (!storeImageUrl) {
                storeImageUrl = DEFAULT_IMG_URL;
                await Store.updateOne(
                    { _id: store._id },
                    { $set: { image: storeImageUrl } }
                );
                console.log(`   └ 가게 image가 null이어서 기본 이미지로 설정: ${store.name}`);
            }
            // 2. 가게의 displayedImg 및 isAllowed 업데이트
            await Store.updateOne(
                { _id: store._id },
                { $set: { displayedImg: storeImageUrl, isAllowed: true } }
            );
            console.log(`✅ 가게 이미지 및 허용 상태 업데이트 완료: ${store.name}`);

            // 2. 가게 메뉴들의 image/displayedImg 업데이트
            if (store.menus && store.menus.length > 0) {
                for (const menuId of store.menus) {
                    const menu = await Menu.findById(menuId);
                    if (menu) {
                        let menuImg = menu.image;
                        if (!menuImg) {
                            menuImg = DEFAULT_IMG_URL;
                            await Menu.updateOne(
                                { _id: menuId },
                                { $set: { image: menuImg } }
                            );
                            console.log(`   └ 메뉴 image가 null이어서 기본 이미지로 설정: ${menu.name}`);
                        }
                        await Menu.updateOne(
                            { _id: menuId },
                            { $set: { displayedImg: menuImg } }
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
            console.error(`❌ ${store.name} 가게 이미지 업데이트 중 오류 발생:`, error);
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