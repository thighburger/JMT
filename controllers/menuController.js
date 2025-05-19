const Menu = require('../models/Menu');
const Like = require('../models/Like');

//나중에 인덱스 걸어보자

const getMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const userId = req.user._id;

    const menu = await Menu.findById(menuId).lean();
    if (!menu) {
      return res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
    }

    // Like 컬렉션에서 해당 유저가 이 메뉴를 좋아요했는지 확인
    const liked = await Like.exists({ user: userId, menu: menuId });

    res.json({
      ...menu,
      liked: !!liked
    });
  } catch (err) {
    res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
  }
};

const likeMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const userId = req.user._id;
    
    // 이미 좋아요 했는지 확인
    const alreadyLiked = await Like.exists({ userId:userId, menuId:menuId });
    if (alreadyLiked) {
      return res.status(400).json({ message: '이미 좋아요를 누르셨습니다.' });
    }
   
    
    // 좋아요 추가
    await Like.create({ userId: userId, menuId: menuId });
    
    // 메뉴의 likeCount 증가
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { $inc: { likeCount: 1 } },
    );

    res.status(200).json({
      message: '메뉴에 좋아요를 추가했습니다.',
      likeCount: updatedMenu.likeCount
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

    // 좋아요 기록이 있는지 확인
    const like = await Like.findOneAndDelete({ userId: userId, menuId: menuId });

    if (!like) {
      const menuExists = await Menu.exists({ _id: menuId });
      if (!menuExists) {
        return res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
      }
      const menu = await Menu.findById(menuId).select('likeCount');
      return res.status(400).json({
        message: '좋아요를 누르지 않았습니다.',
        likeCount: menu.likeCount
      });
    }

    // 메뉴의 likeCount 감소
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { $inc: { likeCount: -1 } },
      { new: true, projection: { likeCount: 1 } }
    );

    res.status(200).json({
      message: '메뉴 좋아요를 취소했습니다.',
      likeCount: updatedMenu.likeCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '좋아요 취소 중 오류가 발생했습니다.' });
  }
};



module.exports = { getMenu, likeMenu, unlikeMenu };
