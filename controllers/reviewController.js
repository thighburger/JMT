const Review = require('../models/Review');
const User = require('../models/User');
const Store = require('../models/Store');
const Menu = require('../models/Menu'); // Menu 모델 추가

// 특정 메뉴의 리뷰 조회
const getReviewsByMenu = async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const reviews = await Review.find({ menuId: menuId })
        .populate('authorId', 'nickname profileImage')
        .sort({ createdAt: -1 });//최근 생성 데이터 먼저 조회
        res.status(200).json(reviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '리뷰를 조회하는 데 실패했습니다.' });
    }
}   

// 리뷰 생성
const createReview = async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const { body } = req.body;
        const authorId = req.user._id; // 인증된 사용자 ID
  
        // 리뷰 생성
        const newReview = await Review.create({ body, authorId });
      
        // 메뉴에 리뷰 추가

        await Menu.findByIdAndUpdate(menuId, {
            $push: { reviews: newReview._id }
            
        });
        console.log('메뉴에 리뷰 추가:', menuId);
        res.status(201).json(newReview);
    } catch (err) {
        console.error('리뷰 생성 실패:', err);
        res.status(500).json({ error: '리뷰 생성 중 오류가 발생했습니다.' });
    }
};

module.exports = {
    getReviewsByMenu,
    createReview,
};
