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
        const newReview = await Review.create({ body, authorId, menuId });
        
        // 메뉴에 리뷰 추가

        await Menu.findByIdAndUpdate(menuId, {
            $push: { reviews: newReview._id }
        });

        res.status(201).json(newReview);
    } catch (err) {
        console.error('리뷰 생성 실패:', err);
        res.status(500).json({ error: '리뷰 생성 중 오류가 발생했습니다.' });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const review = await Review
            .findByIdAndDelete(reviewId)
        if (!review) {
            return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
        }

        // 리뷰 작성자 확인
        const authorId = req.user._id;
        if (review.authorId.toString() !== authorId.toString()) {
            return res.status(403).json({ error: '리뷰를 삭제할 권한이 없습니다.' });
        }

        // 메뉴에서 리뷰 ID 제거
        await Menu.findByIdAndUpdate(review.menuId, {
            $pull: { reviews: reviewId }
        });

        res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
    } catch (err) {
        console.error('리뷰 삭제 실패:', err);
        res.status(500).json({ error: '리뷰 삭제 중 오류가 발생했습니다.' });
    }
}

module.exports = {
    getReviewsByMenu,
    createReview,
    deleteReview
};
