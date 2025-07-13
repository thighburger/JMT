require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('../../models/Menu');
const Like = require('../../models/Like');

async function updateMenuLikeCounts() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const menus = await Menu.find();
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (const menu of menus) {
    // 24시간 이내 좋아요 수
    const dailyLike = await Like.countDocuments({
      menuId: menu._id,
      createdAt: { $gt: dayAgo }
    });
    // 7일 이내 좋아요 수
    const weeklyLike = await Like.countDocuments({
      menuId: menu._id,
      createdAt: { $gt: weekAgo }
    });
    menu.dailylike = dailyLike;
    menu.weeklylike = weeklyLike;
    await menu.save();
    console.log(`${menu.name}: 일간 ${dailyLike}, 주간 ${weeklyLike}`);
  }
  await mongoose.disconnect();
  console.log('모든 메뉴의 좋아요 집계 완료!');
}

updateMenuLikeCounts().catch(err => {
  console.error('집계 중 오류:', err);
  mongoose.disconnect();
});
