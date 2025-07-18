const express = require('express');
const router = express.Router();
const { likeMenu,unlikeMenu,getTop3Menus} = require('../controllers/menuController');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: 메뉴 관련 API
 */

/**
 * @swagger
 * /menus/{menuId}:
 *   get:
 *     summary: 특정 메뉴 조회
 *     description: 특정 메뉴를 조회합니다.
 *     tags: [Menus]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         description: 메뉴 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 메뉴 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 */
//router.get('/:menuId', getMenu); // 특정 메뉴 조회

/**
 * @swagger
 * /menus/{menuId}/like:
 *   post:
 *     summary: 특정 메뉴 좋아요
 *     description: 특정 메뉴를 좋아요 합니다.
 *     tags: [Menus]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         description: 메뉴 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 메뉴 좋아요 성공
 */
router.post('/:menuId/like',authenticateToken, likeMenu); // 메뉴 좋아요

/**
 * @swagger
 * /menus/{menuId}/unlike:
 *   delete:
 *     summary: 특정 메뉴 좋아요 취소
 *     description: 특정 메뉴의 좋아요를 취소합니다.
 *     tags: [Menus]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         description: 메뉴 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 메뉴 좋아요 취소 성공
 */
router.delete('/:menuId/unlike',authenticateToken, unlikeMenu); // 메뉴 좋아요 취소

/**
 * @swagger
 * /menus/top3:
 *   get:
 *     summary: 주간 좋아요 TOP3 메뉴 조회
 *     description: 주간(weeklylike) 좋아요가 많은 메뉴 TOP3를 반환합니다.
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: TOP3 메뉴 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weeklyMenus:
 *                   type: array
 *                   description: 주간 좋아요 TOP3 메뉴 (평면화된 구조)
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 메뉴 ID
 *                       name:
 *                         type: string
 *                         description: 메뉴명
 *                       displayedImg:
 *                         type: string
 *                         description: 메뉴 이미지 URL
 *                       likeCount:
 *                         type: number
 *                         description: 좋아요 수
 *                       storeName:
 *                         type: string
 *                         description: 가게명
 *                       locationCategory:
 *                         type: string
 *                         description: 위치 카테고리 (예: 후문, 정문 등)
 *             example:
 *               dailyMenus:
 *                 - _id: "60d5ec49f8c12a0015b6d7e8"
 *                   name: "치킨마요덮밥"
 *                   displayedimage: "https://example.com/image1.jpg"
 *                   dailylike: 15
 *               weeklyMenus:
 *                 - _id: "60d5ec49f8c12a0015b6d7e9"
 *                   name: "김치찌개"
 *                   displayedImg: "https://example.com/image2.jpg"
 *                   likeCount: 50
 *                   storeName: "맛있는집"
 *                   locationCategory: "후문"
 */
router.get('/top3',getTop3Menus);

module.exports = router;