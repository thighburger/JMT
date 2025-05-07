const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config(); // .env 파일 로드


const app = express();
app.use(cors());
app.use(express.json()); // JSON 파싱 추가
app.use(express.urlencoded({ extended: true }));// URL-encoded 데이터 파싱 추가

const dbUrl = process.env.DB_URL;
const REST_API_KEY = process.env.REST_API_KEY;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

console.log(REST_API_KEY, REDIRECT_URI);


mongoose.connect(dbUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(session({
    secret: CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 개발 환경에서는 false로 설정
}));

const { Schema } = mongoose;

// User 모델 정의 (닉네임 추가)
const userSchema = new mongoose.Schema({
    kakaoId: { type: String, unique: true },
    nickname: { type: String }   // 닉네임 추가
});
const User = mongoose.model('User', userSchema);

// 리뷰 스키마 (별도 컬렉션으로 저장)
const reviewSchema = new Schema({
    body: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }
});
const Review = mongoose.model('Review', reviewSchema);

// 메뉴 스키마 (Store에 내장, 리뷰는 참조)
const menuSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

// 가게 스키마 (menu 내장)
const storeSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    menu: [menuSchema],
    image: { type: String }
});
const Store = mongoose.model('Store', storeSchema);

// 모든 가게 조회 API
app.get('/stores', async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: '가게 데이터를 가져오는 데 실패했습니다.' });
    }
});

// 특정 가게의 메뉴 조회 API
app.get('/stores/:id/menu', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id).populate('menu.reviews');
        if (!store) {
            return res.status(404).json({ error: '가게를 찾을 수 없습니다.' });
        }
        res.json(store.menu);
    } catch (err) {
        res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
    }
});

// OAuth 콜백 라우트
app.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;
    console.log('Authorization code:', code);

    try {
        // 1. 토큰 요청
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', REST_API_KEY);
        params.append('redirect_uri', REDIRECT_URI);
        params.append('code', code);

        const response = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: params
        });
        console.log('Token response', response);
        const data = await response.json();

        const accessToken = data.access_token;
        console.log('Access Token:', accessToken);

        if (!accessToken) {
            console.error('액세스 토큰이 응답에 없습니다:', data);
            return res.status(400).send('토큰 요청 실패');
        }

        // 2. 사용자 정보 요청
        const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
        const userData = await userResponse.json();
        
        const kakaoUserId = userData.id;
        console.log('카카오 사용자 ID:', kakaoUserId);

        // 3. DB에서 사용자 조회 또는 생성
        let user = await User.findOne({ kakaoId: kakaoUserId });
        if (!user) {
            user = new User({ kakaoId: kakaoUserId });
            await user.save();
            console.log('새 사용자 저장:', user);
            req.session.user_id = user._id; // 세션에 사용자 ID 저장 
          
            return res.redirect('http://localhost:5173/nickname'); // 닉네임 입력 페이지로 리디렉션
        } 
        else {
            console.log('기존 사용자:', user);
            req.session.user_id = user._id; // 세션에 사용자 ID 저장
            // 메인 React 페이지로 이동
            
            return res.redirect('http://localhost:5173/mainpage');
        }
    } catch (err) {
        console.error('OAuth 처리 실패:', err);
        res.status(500).send('OAuth 처리 실패');
    }
});

app.post('/nickname', async (req, res) => {
    const {nickname}=req.body;
    userId = req.session.user_id; // 세션에서 사용자 ID 가져오기
    user = await User.findById(userId); //
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }
    user.nickname = nickname; // 닉네임 업데이트
    user.save(); // DB에 저장
    console.log('닉네임 업데이트:', user);
    res.send('닉네임이 업데이트되었습니다.');
});

app.get('/nickname', async (req, res) => {
    const userId = req.session.user_id; // 세션에서 사용자 ID 가져오기
    const user = await User.findById(userId); // 사용자 조회
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }
    res.json({ nickname: user.nickname }); // 닉네임 반환
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
