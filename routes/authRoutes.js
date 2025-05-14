// routes/oauth.js
const express = require('express');
const router = express.Router();
const { handleOAuthCallback } = require('../controllers/authController');

/**
 * @swagger
 * /oauth/callback:
 *   get:
 *     summary: 카카오톡 로그인
 *     description: 카카오 로그인 후 jwt 토큰을 발급 , 클라이언트로 리다이렉트합니다.
 *     responses:
 *       200:
 *         description: 로그인 처리 완료
 */
router.get('/callback', handleOAuthCallback);


module.exports = router;
