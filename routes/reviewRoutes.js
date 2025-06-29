const express = require('express');
const router = express.Router();
const { getReviewsByMenu, createReview, deleteReview } = require('../controllers/reviewController');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /menu/{menuId}/reviews:
 *   get:
 *     summary: 특정 메뉴의 리뷰 조회
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: 메뉴 ID
 *     responses:
 *       200:
 *         description: 리뷰 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: 서버 에러
 */

// 특정 메뉴의 리뷰 조회
router.get('/:menuId/reviews', getReviewsByMenu);


/**
 * @swagger
 * /menu/{menuId}/reviews:
 *   post:
 *     summary: 특정 메뉴에 리뷰 작성
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: 메뉴 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *        
 *     responses:
 *       201:
 *         description: 리뷰 작성 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */
// 특정 메뉴에 리뷰 작성
router.post('/:menuId/reviews', authenticateToken, createReview);

/**
 * @swagger
 * /menu/reviews/{reviewId}:
 *   delete:
 *     summary: 특정 리뷰 삭제
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: 리뷰 ID
 *     responses:
 *       200:
 *         description: 리뷰가 삭제되었습니다.
 *       404:
 *         description: 리뷰를 찾을 수 없습니다.
 *       500:
 *         description: 서버 에러
 */
// 특정 리뷰 삭제
router.delete('/reviews/:reviewId',authenticateToken,deleteReview);



module.exports = router;