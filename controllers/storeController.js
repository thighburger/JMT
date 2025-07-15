// controllers/storeController.js
const Store = require('../models/Store');
const Like = require('../models/Like');
const DEFAULT_IMAGE_URL = 'https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EA%B0%80%EA%B2%8C%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-04+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+9.55.05.png';


const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    const { sortBy = 'likeSum' } = req.query;
    
    let storesWithDistance = stores;
    
    // 위치 정보가 제공되고 거리 계산 미들웨어가 실행된 경우
    if (req.userLocation && req.addDistanceToStores) {
      // 거리 정보를 추가
      storesWithDistance = req.addDistanceToStores(stores);
    } else {
      // 위치 정보가 없으면 distance를 null로 설정
      storesWithDistance = stores.map(store => ({
        ...store.toObject(),
        distance: null
      }));
    }
    
    // 정렬 기준에 따라 정렬
    switch (sortBy) {
      case 'distance':
        // 거리순 정렬 (거리 정보가 없는 경우는 뒤로)
        storesWithDistance.sort((a, b) => {
          if (a.distance === null && b.distance === null) return 0;
          if (a.distance === null) return 1;
          if (b.distance === null) return -1;
          return a.distance - b.distance;
        });
        break;
      case 'likeSum':
      default:
        // 좋아요 수 기준으로 내림차순 정렬
        storesWithDistance.sort((a, b) => b.likeSum - a.likeSum);
        break;
    }

    res.json({
      stores: storesWithDistance,
      userLocation: req.userLocation || null,
      sortBy: sortBy
    });
  
  } catch (err) {
    console.error('가게 데이터 조회 오류:', err);
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
 

    const likedMenuIds = await Like.find({
      userId: userId,
      menuId: { $in: menuIds } // $in 연산자를 사용하여 menuIds 배열과 일치하는 메뉴를 찾음
    }).then(likes => likes.map(like => like.menuId). toString()); // 좋아요한 메뉴 ID 배열 생성

    const menu = store.menus;
    //console.log('store.menus:', store.menus); // 가게의 메뉴 배열 출력
    //console.log('likedMenuIds:', likedMenuIds); // 좋아요한 메뉴 ID 배열 출력
    const menusWithLiked = menu.map(menuItem => {
      let isLiked = likedMenuIds.includes(menuItem._id); // 좋아요 여부 확인
      return {
        ...menuItem.toObject(), // 메뉴 객체를 일반 객체로 변환
        heart: isLiked, // 좋아요 여부 추가
      };
    });
    //console.log('menusWithLiked:', menusWithLiked); // 좋아요 여부가 추가된 메뉴 배열 출력
    //메뉴 좋아요 기준으로 내림차순 정렬
    menusWithLiked.sort((a, b) => b.likeCount - a.likeCount);
    res.json(menusWithLiked);
  } catch (err) {
    console.error('메뉴 데이터를 가져오는 중 오류 발생:', err);
    res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
  }
};

module.exports = { getAllStores, getMenusByStore };
