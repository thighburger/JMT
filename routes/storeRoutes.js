// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStores, getMenusByStore } = require('../controllers/storeController');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: 가게 목록 조회
 *     description: 가게 목록을 조회합니다.
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: 가게 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 */
router.get('/', getAllStores);

/**
 * @swagger
 * /stores/{storeId}/menus:
 *   get:
 *     summary: 특정 가게의 메뉴 조회
 *     description: 특정 가게의 메뉴를 조회합니다.
 *     tags: [Stores]
 *     parameters:
 *       - name: storeId
 *         in: path
 *         required: true
 *         description: 가게 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 메뉴 조회 성공
 *         content: 
 *          application/json:
 *           schema:
 *             type: array
 *             items:
 *              $ref: '#/components/schemas/Menu'
 */
router.get('/:storeId/menus',authenticateToken ,getMenusByStore); 

module.exports = router;
