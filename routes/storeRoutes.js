// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const { getAllStores, getMenusByStore } = require('../controllers/storeController');
const { calculateStoreDistances } = require('../middleware/distanceCalculator');
const authenticateToken = require('../middleware/auth');


/**
 * @swagger
 * /stores:
 *   get:
 *     summary: 가게 목록 조회 (거리 정보 포함)
 *     description: 가게 목록을 조회합니다. 위도/경도를 제공하면 거리 정보도 함께 반환합니다.
 *     tags: [Stores]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: false
 *         schema:
 *           type: number
 *         description: 현재 위치의 위도 (선택사항)
 *         example: 35.1756
 *       - in: query
 *         name: longitude
 *         required: false
 *         schema:
 *           type: number
 *         description: 현재 위치의 경도 (선택사항)
 *         example: 126.9065
 *       - in: query
 *         name: sortBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [distance, likeSum]
 *           default: likeSum
 *         description: 정렬 기준
 *         example: distance
 *     responses:
 *       200:
 *         description: 가게 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stores:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Store'
 *                       - type: object
 *                         properties:
 *                           distance:
 *                             type: number
 *                             description: 거리 (km 단위, 위치 정보 제공시에만)
 *                             nullable: true
 *                 userLocation:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                   nullable: true
 *                 sortBy:
 *                   type: string
 */
router.get('/', (req, res, next) => {
    // 위도/경도가 제공된 경우에만 거리 계산 미들웨어 실행
    if (req.query.latitude && req.query.longitude) {
        calculateStoreDistances(req, res, next);
    } else {
        // 위치 정보가 없으면 바로 다음 미들웨어로
        next();
    }
}, getAllStores);

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
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get('/:storeId/menus',authenticateToken ,getMenusByStore); 

module.exports = router;
