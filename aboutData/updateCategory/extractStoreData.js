require('dotenv').config(); // .env 파일에서 환경 변수 로드

const Store = require('../../models/Store'); // Store Mongoose 모델 임포트
const mongoose = require('mongoose');     // Mongoose 라이브러리 임포트
const connectDB = require('../../config/db'); // DB 연결 함수 임포트
const fs = require('fs');                 // Node.js 파일 시스템 모듈 임포트

async function exportStoresToJsFile() {
    try {
        // 1. 데이터베이스에 연결합니다.
        await connectDB(process.env.DB_URL);
        console.log('데이터베이스 연결 성공!');

        // 2. 모든 가게 문서를 쿼리하고, name과 foodCategory 필드만 선택합니다.
        // _id 필드는 기본적으로 제외되며, .lean()으로 순수 JavaScript 객체를 반환합니다.
        const allStores = await Store.find({}, 'name foodCategory locationCategory -_id').lean();

        // 3. 추출된 데이터를 원하는 JavaScript 배열 형태로 변환합니다.
        const storeUpdatesArray = allStores.map(store => ({
            name: store.name,
            foodCategory: store.foodCategory,
            locationCategory: store.locationCategory
        }));

        // 4. JavaScript 파일에 저장할 문자열을 구성합니다.
        // `module.exports`를 사용하여 다른 파일에서 이 데이터를 임포트할 수 있게 합니다.
        const jsContent = `
// 이 파일은 MongoDB에서 추출된 가게 데이터를 포함합니다.
// 자동 생성된 파일이므로 직접 수정하지 않는 것이 좋습니다.

const storesData = ${JSON.stringify(storeUpdatesArray, null, 2)};

module.exports = storesData;
`;

        // 5. 구성된 문자열을 .js 파일로 저장합니다.
        const filePath = 'storesData.js';
        fs.writeFileSync(filePath, jsContent, 'utf8');

        console.log(`✅ 모든 가게 데이터가 "${filePath}" 파일에 성공적으로 저장되었습니다.`);

    } catch (error) {
        console.error('❌ 데이터 추출 및 JS 파일 저장 중 오류 발생:', error);
    } finally {
        // 6. 모든 작업이 완료되면 데이터베이스 연결을 종료합니다.
        console.log('데이터베이스 연결 종료.');
        mongoose.connection.close();
    }
}

// MongoDB 연결 이벤트 리스너:
// 데이터베이스 연결이 성공적으로 확립되면 exportStoresToJsFile 함수를 호출합니다.
mongoose.connection.on('open', () => {
    exportStoresToJsFile().catch(error => {
        console.error("최상위 export 함수 실행 중 오류 발생:", error);
    });
});

// MongoDB 연결 오류 발생 시 처리
mongoose.connection.on('error', (err) => {
    console.error('MongoDB 연결 오류:', err);
});

// MongoDB 연결이 끊어졌을 때 처리
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB 연결이 끊어졌습니다.');
});

// connectDB 함수를 호출하여 데이터베이스 연결을 시작합니다.
// 이 호출이 성공하면 'open' 이벤트가 발생하고, exportStoresToJsFile이 실행됩니다.
connectDB(process.env.DB_URL);