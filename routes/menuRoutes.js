const express = require('express');
const router = express.Router();
const { likeMenu,unlikeMenu} = require('../controllers/menuController');
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

module.exports = router;