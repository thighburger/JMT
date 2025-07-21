const Store = require('../models/Store');
const Menu = require('../models/Menu');
const User = require('../models/User'); // User 모델 추가

const getRecommendStore = async (req, res) => {
    try {
        const locationCategory = req.params.locationCategory; // URL 파라미터에서 locationCategory를 가져옵니다.

        // 1. 해당 locationCategory에 맞는 가게들을 모두 조회합니다. (menus 필드 제외)
        const stores = await Store.find({ locationCategory: locationCategory }).select('-menus');

        // 2. 조회된 가게가 없는 경우 처리합니다.
        if (stores.length === 0) {
            return res.status(404).json({ message: '해당 지역 카테고리에 맞는 가게가 없습니다.' });
        }

        // 3. 랜덤으로 가게 하나를 선택합니다.
        const randomIndex = Math.floor(Math.random() * stores.length);
        const recommendStore = stores[randomIndex];

        // 4. 선택된 가게에서 좋아요가 가장 많은 메뉴의 이름을 조회합니다.
        const topMenu = await Menu.findOne({ storeId: recommendStore._id })
            .sort({ likeCount: -1 })
            .select('name');

        // 5. 가게 객체에 popularMenu 필드를 추가하여 응답으로 보냅니다.
        const storeWithPopularMenu = {
            ...recommendStore.toObject(),
            popularMenu: topMenu ? topMenu.name : null
        };

        res.status(200).json(storeWithPopularMenu);

    } catch (err) {
        console.error('가게 추천 조회 중 오류 발생:', err); // 에러 로그를 좀 더 상세하게
        res.status(500).json({ error: '가게 추천에 실패했습니다.' });
    }
}

const getSimilarUserRecommendMenus = async (req, res) => {
    try {
        const userId = req.user._id; // 인증된 사용자 ID

        // 1. 사용자의 recommendMenus 조회
        const user = await User.findById(userId).select('recommendMenus');
        
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        if (!user.recommendMenus || user.recommendMenus.length === 0) {
            return res.status(200).json([]); // 빈 배열로 반환
        }

        // 2. recommendMenus에 있는 메뉴들의 상세 정보 조회 (가게 정보 포함)
        const recommendedMenus = await Menu.find({
            _id: { $in: user.recommendMenus }
        })
        .select('name displayedImg likeCount storeId')
        .populate('storeId', 'name locationCategory');

        // 3. storeId 정보를 평면화하여 storeName과 locationCategory로 변환
        const transformedMenus = recommendedMenus.map(menu => ({
            _id: menu._id,
            name: menu.name,
            displayedImg: menu.displayedImg,
            likeCount: menu.likeCount,
            storeName: menu.storeId.name,
            locationCategory: menu.storeId.locationCategory
        }));

        res.status(200).json(transformedMenus);

    } catch (err) {
        console.error('유사 사용자 메뉴 추천 조회 중 오류 발생:', err);
        res.status(500).json({ error: '메뉴 추천에 실패했습니다.' });
    }
};

module.exports = { getRecommendStore, getSimilarUserRecommendMenus };