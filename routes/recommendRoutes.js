const express = require('express');
const router = express.Router();
const {getRecommendStore, getSimilarUserRecommendMenus}=require('../controllers/recommendController');
const authenticateToken = require('../middleware/auth');


/**
 * @swagger
 * /recommend/similarUserRecommend:
 *   get:
 *     summary: 유사한 사용자 기반 메뉴 추천
 *     description: 로그인한 사용자와 유사한 취향을 가진 사용자들이 좋아하는 메뉴 3개를 추천합니다.
 *     tags: [Recommend]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 추천 메뉴 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: 사용자 ID
 *                 recommendMenus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 메뉴 ID
 *                       name:
 *                         type: string
 *                         description: 메뉴명
 *                       price:
 *                         type: number
 *                         description: 가격
 *                       image:
 *                         type: string
 *                         description: 메뉴 이미지
 *                       displayedImg:
 *                         type: string
 *                         description: 표시용 이미지
 *                       likeCount:
 *                         type: number
 *                         description: 좋아요 수
 *                       store:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: 가게 ID
 *                           name:
 *                             type: string
 *                             description: 가게명
 *                           location:
 *                             type: string
 *                             description: 가게 주소
 *                           locationCategory:
 *                             type: string
 *                             description: 위치 카테고리
 *                           foodCategory:
 *                             type: string
 *                             description: 음식 카테고리
 *                           image:
 *                             type: string
 *                             description: 가게 이미지
 *                           displayedImg:
 *                             type: string
 *                             description: 표시용 이미지
 *             example:
 *               userId: "60d5ec49f1b2c8b1f8e4e1a1"
 *               recommendMenus:
 *                 - _id: "60d5ec49f1b2c8b1f8e4e1a2"
 *                   name: "김치찌개"
 *                   price: 8000
 *                   image: "https://example.com/kimchi.jpg"
 *                   displayedImg: "https://example.com/kimchi_display.jpg"
 *                   likeCount: 25
 *                   store:
 *                     _id: "60d5ec49f1b2c8b1f8e4e1a3"
 *                     name: "맛있는집"
 *                     location: "광주 북구 ..."
 *                     locationCategory: "상대"
 *                     foodCategory: "한식"
 *                     image: "https://example.com/store.jpg"
 *                     displayedImg: "https://example.com/store_display.jpg"
 *       401:
 *         description: 인증되지 않은 사용자
 *       404:
 *         description: 사용자를 찾을 수 없습니다
 *       500:
 *         description: 서버 오류
 */
router.get('/similarUserRecommend', authenticateToken, getSimilarUserRecommendMenus);

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