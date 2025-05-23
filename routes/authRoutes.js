// routes/oauth.js
const express = require('express');
const router = express.Router();
const { handleOAuthCallback } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');
/**
 * @swagger
 * /auth/kakao:
 *   description: 카카오톡 로그인
 *   post:
 *     summary: 카카오톡 로그인
 *     description: 
 *     responses:
 *       200:
 *         description: 로그인 처리 완료
 *     
 */
router.post('/kakao', handleOAuthCallback);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: JWT 토큰 검증
 *     description: JWT 토큰의 유효성을 검증합니다.
 *     responses:
 *       200:
 *         description: 토큰 유효함
 *       401:
 *         description: 토큰 없음
 *       403:
 *         description: 토큰 유효하지 않음
 */
router.get('/verify', authenticateToken, (req, res) => {
  // authenticateToken 미들웨어가 성공적으로 토큰 검증 완료한 후 이 함수가 실행됩니다.
  
  // req.user에 JWT payload가 들어있음
  res.status(200).json({
    message: '토큰 유효함',
    user: req.user.user // jwt.sign할 때 { user: {...} }로 payload 넣었으므로
  });
});

module.exports = router;
