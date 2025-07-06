// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateNickname, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * /user/nickname:
 *   post:
 *     summary: 사용자 닉네임 업데이트
 *     description: 사용자의 닉네임을 업데이트합니다.
 *     tags: [Users]
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
router.post('/nickname', authenticateToken ,updateNickname);

/**
 * @swagger
 * /user/me:
 *   delete:
 *     summary: 사용자 삭제
 *     description: 현재 사용자를 삭제합니다.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 사용자 삭제 성공
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.delete('/me',authenticateToken,deleteUser);

module.exports = router;
