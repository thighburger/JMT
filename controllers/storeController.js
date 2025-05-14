// controllers/storeController.js
const Store = require('../models/Store');


const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: '가게 데이터를 가져오는 데 실패했습니다.' });
    }
};

// const getMenusByStore = async (req, res) => {
//     try {
//         console.log('Store ID:', req.params.storeId);  // 요청된 storeId 로그 출력

//         const store = await Store.findById(req.params.storeId).populate('menus');
//         if (!store) {
//             return res.status(404).json({ error: '가게를 찾을 수 없습니다.' });
//         }
//         console.log('Store found:', store);  // Store 정보가 잘 불러왔는지 로그 출력

//         res.json(store.menus);  // 메뉴 반환
//     } catch (err) {
//         console.error('Error:', err);  // 에러 발생 시 콘솔에 에러 출력
//         res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
//     }
// };

const getMenusByStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.storeId).populate('menus');
        if (!store) {
            return res.status(404).json({ error: '가게를 찾을 수 없습니다.' });
        }
        res.json(store.menus);
    } catch (err) {
        res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
    }
};

module.exports = { getAllStores, getMenusByStore };
