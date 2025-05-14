const express = require('express');
const router = express.Router();
const { getMenu,likeMenu,unlikeMenu} = require('../controllers/menuController');

/**
 * @swagger
 * /{menuId}:
 *   get:
 *     summary: 특정 메뉴 조회
 *     description: 특정 메뉴를 조회합니다.
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
 */
router.post('/', getMenu); // 특정 메뉴 조회

/**
 * @swagger
 * /{menuId}:
 *   post:
 *     summary: 특정 메뉴 좋아요
 *     description: 특정 메뉴를 좋아요 합니다.
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
router.post('/like', likeMenu); // 메뉴 좋아요

/**
 * @swagger
 * /{menuId}/unlike:
 *   post:
 *     summary: 특정 메뉴 좋아요취소
 *     description: 특정 메뉴를 좋아요를 취소합니다.
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
router.post('/unlike', unlikeMenu); // 메뉴 좋아요 취소

module.exports = router;