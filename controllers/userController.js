// controllers/userController.js
const User = require('../models/User');
const Like = require('../models/Like');
const Review = require('../models/Review');
const Menu = require('../models/Menu'); // Menu 모델 추가

const updateNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }

    user.nickname = nickname;
    await user.save();
    console.log('닉네임 업데이트:', user);
    res.send('닉네임이 업데이트되었습니다.');
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;

        // 사용자 존재 여부 확인
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        // 관련 데이터 삭제
        await Like.deleteMany({ userId: userId });
        const reviews = await Review.find({ authorId: userId });
        const reviewIds = reviews.map(review => review._id);
        // 모든 메뉴에서 해당 리뷰 ID를 $pull로 제거
        await Menu.updateMany(
            { reviews: { $in: reviewIds } },
            { $pull: { reviews: { $in: reviewIds } } }
        );
        // 리뷰 삭제
        await Review.deleteMany({ authorId: userId });
        
        // 사용자 삭제
        await User.findByIdAndDelete(userId);



        console.log('사용자 및 관련 데이터 삭제 완료:', user);
        res.json({ message: '사용자가 삭제되었습니다.' });
    } catch (err) {
        console.error('사용자 삭제 실패:', err);
        res.status(500).json({ error: '사용자 삭제에 실패했습니다.' });
    }
};

module.exports = { updateNickname , deleteUser };
