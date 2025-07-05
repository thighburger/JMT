const express = require('express');
const router = express.Router();
const {getRecommendStore}=require('../controllers/recommendController');


/**
 * @swagger
 * /recommend/{locationCategory}:
 *   get:
 *     summary: 가게 랜덤 반환
 *     description: 상대,후문,정문 받아서 그중 가게 랜덤반환.
 *     tags: [Recommend]
 *     parameters:
 *       - in: path
 *         name: locationCategory
 *         required: true
 *         schema:
 *           type: string
 *         description: 위치분류
 *     responses:
 *       200:
 *         description: 가게 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 */
router.get('/:locationCategory', getRecommendStore); 

module.exports=router;