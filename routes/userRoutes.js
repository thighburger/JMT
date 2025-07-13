// routes/userRoutes.js
const express = require('express');
const router = express.Router();
// multer 추가
const multer = require('multer');
// path는 파일 확장자 추출 등 필요할 수 있어 임포트
const path = require('path'); 

const { updateNickname, deleteUser, updateProfileImg , getUserInfo} = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

// Multer 설정: S3로 바로 업로드할 것이므로 메모리에 저장하도록 설정
const upload = multer({
    storage: multer.memoryStorage(), // 파일을 메모리에 버퍼 형태로 저장
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB로 파일 크기 제한 (선택 사항)
    fileFilter: (req, file, cb) => {
        // 이미지 파일만 허용 (선택 사항)
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            // 파일 형식이 잘못된 경우 에러 콜백 호출
            // 에러 메시지는 필요에 따라 수정 가능
            console.error('파일 형식이 잘못되었습니다:', file.mimetype);
            cb(new Error('이미지 파일(jpg, png, gif)만 업로드할 수 있습니다.'), false);
        }
    }
});

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

/**
 * @swagger
 * /user/profileImg:
 *   post:
 *     summary: 사용자 프로필 이미지 업로드
 *     description: 사용자의 프로필 이미지를 업로드합니다. 이미지 파일은 multipart/form-data 형식으로 전송해야 합니다.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # JWT 토큰 인증
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profileImg:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 프로필 이미지 파일
 *     responses:
 *       200:
 *         description: 프로필 이미지 업로드 성공
 *       400:
 *         description: 잘못된 요청 또는 이미지 업로드 실패
 *       500:
 *         description: 서버 오류
 */
router.post('/profileImg', authenticateToken ,upload.single('profileImg'), updateProfileImg);

/**
 * @swagger
 * /user/userInfo:
 *   get:
 *     summary: 사용자 정보 반환
 *     description: 사용자 정보를 반환합니다.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 사용자 정보 반환 성공
 *       404:
 *         description: 사용자를 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/userInfo',authenticateToken, getUserInfo);

module.exports = router;
