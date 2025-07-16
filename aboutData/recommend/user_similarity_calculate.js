// aboutData/recommend/user_similarity_calculate.js
// 모든 유저의 likedMenus 기반으로 자카드 유사도 계산 후 similarUsers 필드 갱신

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../models/User');
const MONGO_URI = process.env.DB_URL || 'mongodb://localhost:27017/jmt';

async function updateAllSimilarUsers() {
    await mongoose.connect(MONGO_URI);
    const users = await User.find({});
    for (const targetUser of users) {
        const targetLikedMenus = new Set(targetUser.likedMenus.map(String));
        const otherUsers = users.filter(u => String(u._id) !== String(targetUser._id));
        const similarities = otherUsers.map(user => {
            const otherLikedMenus = new Set(user.likedMenus.map(String));
            const intersection = new Set([...targetLikedMenus].filter(x => otherLikedMenus.has(x)));
            const union = new Set([...targetLikedMenus, ...otherLikedMenus]);
            const jaccard = union.size === 0 ? 0 : intersection.size / union.size;
            return { userId: user._id, similarity: jaccard };
        });
        const top5 = similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
        const top5Ids = top5.map(u => u.userId);
        targetUser.similarUsers = top5Ids;

        // top5Ids 유저들의 likedMenus를 중복 없이 모아서 nextRecommendedMenu에만 저장
        const top5Users = users.filter(u => top5Ids.map(String).includes(String(u._id)));
        const recommendedMenuSet = new Set();
        top5Users.forEach(u => {
            u.likedMenus.forEach(menuId => {
                recommendedMenuSet.add(String(menuId));
            });
        });
        // nextRecommendedMenu 필드에 similarUsers들이 좋아요한 메뉴들을 중복 없이 배열로 저장
        const recommendedMenusArr = Array.from(recommendedMenuSet);
        targetUser.nextRecommendedMenu = recommendedMenusArr;

        await targetUser.save();
        console.log(`User ${targetUser._id} updated similarUsers:`, top5Ids);
    }
    await mongoose.disconnect();
    console.log('All users similarUsers update complete.');
}

updateAllSimilarUsers().catch(err => {
    console.error('Error updating similarUsers:', err);
    mongoose.disconnect();
});
