const Menu = require('../models/Menu');
const Like = require('../models/Like');
const Store = require('../models/Store');

//나중에 인덱스 걸어보자
const likeMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const userId = req.user._id;
    
    // 이미 좋아요 했는지 확인
    const alreadyLiked = await Like.exists({ userId:userId, menuId:menuId });
    if (alreadyLiked) {
      return res.status(400).json({ message: '이미 좋아요를 누르셨습니다.' });
    }
   
    const menu= await Menu.findById(menuId);
    
    // 좋아요 추가
    await Like.create({ userId: userId, menuId: menuId });
    
    // 메뉴의 likeCount 증가
    await Menu.findByIdAndUpdate(
      menuId,
      { $inc: { likeCount: 1 } },
      { new: true }
    );
    
    const store=await Store.findByIdAndUpdate(
      menu.storeId,
      { $inc: { likeSum: 1 } },
      { new: true }
    );

    menu.heart=true;
    await menu.save();
    
    res.status(200).json({
      message: '메뉴에 좋아요를 추가했습니다.',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '메뉴에 좋아요를 추가하는 데 실패했습니다.' });
  }
};



const unlikeMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const userId = req.user._id;
    const menu = await Menu.findById(menuId);
    // 좋아요 기록이 있는지 확인
    const like = await Like.findOneAndDelete({ userId: userId, menuId: menuId });

    if (!like) {
      const menuExists = await Menu.exists({ _id: menuId });
      if (!menuExists) {
        return res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
      }
      return res.status(400).json({
        message: '좋아요를 누르지 않았습니다.',
      });
    }

    // 메뉴의 likeCount 감소
    await Menu.findByIdAndUpdate(
      menuId,
      { $inc: { likeCount: -1 } },
      { new: true}
    );

    const store= await Store.findByIdAndUpdate(
      menu.storeId,
      { $inc: { likeSum: -1 } },
      { new: true }
    );
    
    menu.heart=false;
    await menu.save();

    console.log(store);
    res.status(200).json({
      message: '메뉴 좋아요를 취소했습니다.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '좋아요 취소 중 오류가 발생했습니다.' });
  }
};

const getTop3Menus = async (req, res) => {
  try {
    const dailyMenus = await Menu.find()
      .sort({ dailylike: -1 })
      .limit(3)
      .select('name image dailylike');
    
    const weeklyMenus = await Menu.find()
      .sort({ weeklylike: -1 })
      .limit(3)
      .select('name image weeklylike');

    res.status(200).json({
      daily: dailyMenus,
      weekly: weeklyMenus
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '메뉴 TOP3 조회 중 오류가 발생했습니다.' });
  }
}

module.exports = {likeMenu, unlikeMenu,getTop3Menus};