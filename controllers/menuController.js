const Menu = require('../models/Menu');

const getMenu = async (req, res) => {
    try {
        const menuId = req.params.menuId;
        const menu = await Menu.findById(menuId).populate('reviews');
        
        if (!menu) {
            return res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
        }
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: '메뉴 데이터를 가져오는 데 실패했습니다.' });
    }
}

const likeMenu = async (req, res) => {
    try{
        const menuId = req.params.menuId;
        // 메뉴 찾기
        const menu = await Menu.findById(menuId);
    
        if (!menu) {
            return res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
        }
        //좋아요 수 증가

        menu.likeCount += 1;
        await menu.save();
        res.status(200).json({ message: '메뉴에 좋아요를 추가했습니다.', likeCount: menu.likeCount });
        // 사용자에게 좋아요 추가
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: '메뉴에 좋아요를 추가하는 데 실패했습니다.' });
    }
}

const unlikeMenu = async (req, res) => {
    try{
        const menuId = req.params.menuId;
        // 메뉴 찾기
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ error: '메뉴를 찾을 수 없습니다.' });
        }
        //좋아요 수 감소
        menu.likeCount -= 1;
        await menu.save();
        res.status(200).json({ message: '메뉴에 좋아요를 제거했습니다.', likeCount: menu.likeCount });
    }
    catch (err) {
        res.status(500).json({ error: '메뉴에 좋아요를 제거하는 데 실패했습니다.' });
    }
}

module.exports = { getMenu, likeMenu, unlikeMenu };
