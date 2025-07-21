// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');



const handleOAuthCallback = async (req, res) => {
    const { accessToken } = req.body;
   
    try {
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

        // 3. 사용자 조회 또는 생성
        let user = await User.findOne({ kakaoId: kakaoUserId });
        if (!user) {
            user = new User({ kakaoId: kakaoUserId });
            await user.save();
        }

        // 4. JWT 생성
        const jwtToken = jwt.sign(
            {
                _id: user._id,
                accessToken: accessToken
            },
            process.env.JWT_SECRET
        );
        
        // 5. JWT를 클라이언트에 전달
        res.json({ token: jwtToken });
	  
    } catch (err) {
        console.error('OAuth 처리 실패:', err);
        res.status(500).send('OAuth 처리 실패');
    }
};

const handlePWAKakaoLogin = async (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: '인가 코드가 필요합니다.' });
    }
    
    try {
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
        
        if (!tokenResponse.ok) {
            console.error('카카오 토큰 요청 실패:', tokenData);
            return res.status(400).json({ error: '카카오 인증에 실패했습니다.' });
        }
        
        const kakaoAccessToken = tokenData.access_token;
        
        // 2. 액세스 토큰으로 사용자 정보 요청
        const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${kakaoAccessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });
        
        const userData = await userResponse.json();
        
        if (!userResponse.ok) {
            console.error('카카오 사용자 정보 요청 실패:', userData);
            return res.status(400).json({ error: '사용자 정보를 가져올 수 없습니다.' });
        }
        
        const kakaoUserId = userData.id;
        
        // 3. 사용자 조회 또는 생성
        let user = await User.findOne({ kakaoId: kakaoUserId });
        if (!user) {
            user = new User({ kakaoId: kakaoUserId });
            await user.save();
        }
        
        // 4. JWT 생성
        const jwtToken = jwt.sign(
            {
                _id: user._id,
                accessToken: kakaoAccessToken
            },
            process.env.JWT_SECRET
        );
        
        // 5. JWT를 클라이언트에 전달
        res.json({ token: jwtToken });
        
    } catch (error) {
        console.error('PWA 카카오 로그인 처리 실패:', error);
        res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
    }
};

module.exports = { handleOAuthCallback, handlePWAKakaoLogin };
