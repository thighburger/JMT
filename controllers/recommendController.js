const Store = require('../models/Store');

const getRecommendStore = async (req, res) => {
    try {
        const locationCategory = req.params.locationCategory; // URL 파라미터에서 locationCategory를 가져옵니다.

        // 1. 해당 locationCategory에 맞는 가게들을 모두 조회합니다.
        const stores = await Store.find({ locationCategory: locationCategory });

        // 2. 조회된 가게가 없는 경우 처리합니다.
        if (stores.length === 0) {
            return res.status(404).json({ message: '해당 지역 카테고리에 맞는 가게가 없습니다.' });
        }

        // 3. 랜덤으로 가게 하나를 선택합니다.
        const randomIndex = Math.floor(Math.random() * stores.length);
        const recommendStore = stores[randomIndex];

        // 4. 선택된 가게를 응답으로 보냅니다.
        res.status(200).json(recommendStore);

    } catch (err) {
        console.error('가게 추천 조회 중 오류 발생:', err); // 에러 로그를 좀 더 상세하게
        res.status(500).json({ error: '가게 추천에 실패했습니다.' });
    }
}

module.exports = { getRecommendStore };