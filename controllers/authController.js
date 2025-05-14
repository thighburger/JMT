// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const handleOAuthCallback = async (req, res) => {
    const { code } = req.query;
    const { REST_API_KEY, REDIRECT_URI, JWT_SECRET, CLIENT_REDIRECT_URL } = process.env;

    try {
        // 1. 카카오 토큰 요청
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', REST_API_KEY);
        params.append('redirect_uri', REDIRECT_URI);
        params.append('code', code);

        const response = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: params
        });
        
        const data = await response.json();
        console.log('erorroeo:', data);
        const accessToken = data.access_token;
        if (!accessToken) {
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

        // 3. 사용자 조회 또는 생성
        let user = await User.findOne({ kakaoId: kakaoUserId });
        if (!user) {
            user = new User({ kakaoId: kakaoUserId });
            await user.save();
        }

        // 4. JWT 생성
        const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        console.log('JWT Token:', jwtToken);
        // 5. 클라이언트로 리다이렉트 (쿼리 파라미터로 토큰 전달)
        // const redirectUrl = `${CLIENT_REDIRECT_URL}?token=${jwtToken}`;
        // return res.redirect(redirectUrl);

    } catch (err) {
        console.error('OAuth 처리 실패:', err);
        res.status(500).send('OAuth 처리 실패');
    }
};


module.exports = { handleOAuthCallback };
