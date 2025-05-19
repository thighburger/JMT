// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateNickname, getNickname } = require('../controllers/userController');

/**
 * @swagger
 * /user/nickname:
 *   post:
 *     summary: 사용자 닉네임 업데이트
 *     description: 사용자 닉네임을 업데이트합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *     responses:
 *       200:
 *         description: 닉네임 업데이트 성공
 */
router.post('/nickname', updateNickname);


module.exports = router;
