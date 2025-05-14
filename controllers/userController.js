// controllers/userController.js
const User = require('../models/User');

const updateNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = req.session.user_id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }

    user.nickname = nickname;
    await user.save();
    console.log('닉네임 업데이트:', user);
    res.send('닉네임이 업데이트되었습니다.');
};

const getNickname = async (req, res) => {
    const userId = req.session.user_id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }

    res.json({ nickname: user.nickname });
};

module.exports = { updateNickname, getNickname };
