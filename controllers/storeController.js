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

    const menuIds = store.menus.map(menu => menu._id); // 가게의 메뉴 ID 목록
    console.log('store.menus:', menuIds); // store.menus 배열 출력

    const likedMenuIds = await Like.find({
      userId: userId,
      menuId: { $in: menuIds } // $in 연산자를 사용하여 menuIds 배열과 일치하는 메뉴를 찾음
    }).then(likes => likes.map(like => like.menuId));

    const menu = store.menus;
    console.log(likedMenuIds)

    const menusWithLiked = menuIds.map(menuId => {
      let isLiked = false;
      if (likedMenuIds.includes(menuId)) {
        isLiked = true; // 메뉴가 좋아요 목록에 있는 경우
      }
      return {
        ...menu.toObject(), // 메뉴 객체를 일반 객체로 변환
        heart: isLiked, // 좋아요 여부 추가
      };
    });

    //메뉴 좋아요 기준으로 내림차순 정렬
    menusWithLiked.sort((a, b) => b.likeCount - a.likeCount);
    res.json(menusWithLiked);
  } catch (err) {
    console.error('메뉴 데이터를 가져오는 중 오류 발생:', err);
    res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
  }
};

module.exports = { getAllStores, getMenusByStore };
