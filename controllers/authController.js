// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// const handleOAuthCallback = async (req, res) => {
//     const { code } = req.query;
//     const { REST_API_KEY, REDIRECT_URI, JWT_SECRET} = process.env;

//     try {
//         // 1. 카카오 토큰 요청
//         const params = new URLSearchParams();
//         params.append('grant_type', 'authorization_code');
//         params.append('client_id', REST_API_KEY);
//         params.append('redirect_uri', REDIRECT_URI);
//         params.append('code', code);

//         const response = await fetch('https://kauth.kakao.com/oauth/token', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
//             body: params
//         });

//         const data = await response.json();
//         const accessToken = data.access_token;
//         if (!accessToken) {
//             return res.status(400).send('토큰 요청 실패');
//         }

//         // 2. 사용자 정보 요청
//         const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//             }
//         });
//         const userData = await userResponse.json();
//         const kakaoUserId = userData.id;

//         // 3. 사용자 조회 또는 생성
//         let user = await User.findOne({ kakaoId: kakaoUserId });
//         if (!user) {
//             user = new User({ kakaoId: kakaoUserId });
//             await user.save();
//         }

//         // 4. JWT 생성
//         const jwtToken = jwt.sign(
//             {id: user._id} , 
//             JWT_SECRET, 
//             { expiresIn: '7d' }
//         );

//         console.log('JWT Token:', jwtToken);
//         // 5. JWT를 클라이언트에 전달
//         res.json({ token: jwtToken });


//     } catch (err) {
//         console.error('OAuth 처리 실패:', err);
//         res.status(500).send('OAuth 처리 실패');
//     }
// };

const handleOAuthCallback = async (req, res) => {
    const { accessToken } = req.body;
    console.log(accessToken);
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
            '1234567890',
            { expiresIn: '7d' }
        );

        // 5. JWT를 클라이언트에 전달
        res.json({ token: jwtToken });
	console.log(jwtToken);

    } catch (err) {
        console.error('OAuth 처리 실패:', err);
        res.status(500).send('OAuth 처리 실패');
    }
};


module.exports = { handleOAuthCallback };
