const express = require('express');
const router = express.Router();
const {getRecommendStore}=require('../controllers/recommendController');


/**
 * @swagger
 * /recommend/{locationCategory}:
 *   get:
 *     summary: 가게 랜덤 반환 (인기 메뉴명 포함)
 *     description: 상대,후문,정문 받아서 그중 가게 랜덤반환하고, 해당 가게의 가장 좋아요가 많은 메뉴명을 popularMenu 필드로 포함하여 반환. menus 배열은 제외됨.
 *     tags: [Recommend]
 *     parameters:
 *       - in: path
 *         name: locationCategory
 *         required: true
 *         schema:
 *           type: string
 *           enum: [상대, 후문, 정문]
 *         description: 위치분류
 *     responses:
 *       200:
 *         description: 가게 및 인기 메뉴명 반환 성공 (menus 배열 제외)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Store'
 *                 - type: object
 *                   properties:
 *                     popularMenu:
 *                       type: string
 *                       nullable: true
 *                       description: 해당 가게의 가장 좋아요가 많은 메뉴명
 *             example:
 *               isAllowed: false
 *               _id: "68616eb883c963aea392e6d1"
 *               name: "전대맛칼국수"
 *               location: "광주 북구 반룡로42번길 26 1층"
 *               image: "https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/전대맛칼국수 전남대점/대표사진.jpg"
 *               likeSum: 0
 *               locationCategory: "상대"
 *               foodCategory: "한식"
 *               __v: 1
 *               displayedImg: null
 *               popularMenu: "바지락칼국수"
 *       404:
 *         description: 해당 지역 카테고리에 맞는 가게가 없습니다
 *       500:
 *         description: 서버 오류
 */
router.get('/:locationCategory', getRecommendStore); 

module.exports=router;