// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');



const handleOAuthCallback = async (req, res) => {
    const { accessToken } = req.body;
    console.log('카카오 OAuth 콜백 처리 시작');
   
    try {
        console.log('카카오 사용자 정보 요청 시작');
        // 2. 사용자 정보 요청
        const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
        const userData = await userResponse.json();
        console.log('카카오 사용자 정보 응답:', { id: userData.id, status: userResponse.status });
        
        const kakaoUserId = userData.id;

        console.log('데이터베이스에서 사용자 조회 시작, kakaoId:', kakaoUserId);
        // 3. 사용자 조회 또는 생성
        let user = await User.findOne({ kakaoId: kakaoUserId });
        if (!user) {
            console.log('새 사용자 생성 중, kakaoId:', kakaoUserId);
            user = new User({ kakaoId: kakaoUserId });
            await user.save();
            console.log('새 사용자 생성 완료, userId:', user._id);
        } else {
            console.log('기존 사용자 찾음, userId:', user._id);
        }

        console.log('JWT 토큰 생성 시작');
        // 4. JWT 생성
        const jwtToken = jwt.sign(
            {
                _id: user._id,
                accessToken: accessToken
            },
            process.env.JWT_SECRET
        );
        
        console.log('카카오 OAuth 로그인 성공, userId:', user._id);
        // 5. JWT를 클라이언트에 전달
        res.json({ token: jwtToken });
	  
    } catch (err) {
        console.error('OAuth 처리 실패:', err);
        res.status(500).send('OAuth 처리 실패');
    }
};

const handlePWAKakaoLogin = async (req, res) => {
    const { code } = req.body;
    console.log('PWA 카카오 로그인 처리 시작, code 길이:', code ? code.length : 0);
    
    if (!code) {
        console.log('인가 코드 누락 오류');
        return res.status(400).json({ error: '인가 코드가 필요합니다.' });
    }
    
    try {
        console.log('카카오 액세스 토큰 요청 시작');
        // 1. 인가 코드로 액세스 토큰 요청
        const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: process.env.REST_API_KEY, // 카카오 REST API 키
                redirect_uri: process.env.REDIRECT_URI,
                code: code
            })
        });
        
        const tokenData = await tokenResponse.json();
        console.log('카카오 토큰 응답:', { status: tokenResponse.status, hasAccessToken: !!tokenData.access_token });
        
        if (!tokenResponse.ok) {
            console.error('카카오 토큰 요청 실패:', tokenData);
            return res.status(400).json({ error: '카카오 인증에 실패했습니다.' });
        }
        
        const kakaoAccessToken = tokenData.access_token;
        
        console.log('카카오 사용자 정보 요청 시작');
        // 2. 액세스 토큰으로 사용자 정보 요청
        const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${kakaoAccessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
        
        const userData = await userResponse.json();
        console.log('카카오 사용자 정보 응답:', { id: userData.id, status: userResponse.status });
        
        if (!userResponse.ok) {
            console.error('카카오 사용자 정보 요청 실패:', userData);
            return res.status(400).json({ error: '사용자 정보를 가져올 수 없습니다.' });
        }
        
        const kakaoUserId = userData.id;
        
        console.log('데이터베이스에서 사용자 조회 시작, kakaoId:', kakaoUserId);
        // 3. 사용자 조회 또는 생성
        let user = await User.findOne({ kakaoId: kakaoUserId });
        if (!user) {
            console.log('새 사용자 생성 중, kakaoId:', kakaoUserId);
            user = new User({ kakaoId: kakaoUserId });
            await user.save();
            console.log('새 사용자 생성 완료, userId:', user._id);
        } else {
            console.log('기존 사용자 찾음, userId:', user._id);
        }
        
        console.log('JWT 토큰 생성 시작');
        // 4. JWT 생성
        const jwtToken = jwt.sign(
            {
                _id: user._id,
                accessToken: kakaoAccessToken
            },
            process.env.JWT_SECRET
        );
        
        console.log('PWA 카카오 로그인 성공, userId:', user._id);
        // 5. JWT를 클라이언트에 전달
        res.json({ token: jwtToken });
        
    } catch (error) {
        console.error('PWA 카카오 로그인 처리 실패:', error);
        res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
    }
};

module.exports = { handleOAuthCallback, handlePWAKakaoLogin };
