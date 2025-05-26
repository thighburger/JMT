// controllers/storeController.js
const Store = require('../models/Store');
const Like = require('../models/Like');

const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        //likeSum을 기준으로 내림차순 정렬
        stores.sort((a, b) => b.likeSum - a.likeSum);
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

    const menusWithLiked = store.menus.map(menu => {
      let heart = false;
      if (likedMenus.some(like => like.menu.toString() === menu._id.toString())) {
        heart = true;
      }
      return {
        ...menu.toObject(),
        heart: heart
      };
    });
    //메뉴 좋아요 기준으로 내림차순 정렬
    menusWithLiked.sort((a, b) => b.likeCount - a.likeCount);
    res.json(menusWithLiked);
  } catch (err) {
    res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
  }
};

module.exports = { getAllStores, getMenusByStore };
