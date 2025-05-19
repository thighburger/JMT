// controllers/storeController.js
const Store = require('../models/Store');
const Like = require('../models/Like');

const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: '가게 데이터를 가져오는 데 실패했습니다.' });
    }
};



const getMenusByStore = async (req, res) => {
  try {
    const userId = req.user._id;
    const store = await Store.findById(req.params.storeId).populate('menus');

    if (!store) {
      return res.status(404).json({ error: '가게를 찾을 수 없습니다.' });
    }

    const menuIds = store.menus.map(menu => menu._id);

    // 이 유저가 좋아요한 메뉴 id 목록 조회 (Like 컬렉션 기준)
    const likedMenus = await Like.find({
      user: userId,
      menu: { $in: menuIds }
    }).select('menu');

    const likedMenuIdSet = new Set(likedMenus.map(like => like.menuId));

    // 각 메뉴에 liked 필드 추가
    const menusWithLiked = store.menus.map(menu => ({
      menu,
      liked: likedMenuIdSet.has(menu._id)
    }));

    res.json(menusWithLiked);
  } catch (err) {
    res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
  }
};

module.exports = { getAllStores, getMenusByStore };
