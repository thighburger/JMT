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


module.exports = { handleOAuthCallback };
