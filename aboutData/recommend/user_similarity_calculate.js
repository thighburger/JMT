// aboutData/recommend/user_similarity_calculate.js
// 모든 유저의 likedMenus 기반으로 자카드 유사도 계산 후 similarUsers 필드 갱신

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../models/User');
const Menu = require('../../models/Menu');
const MONGO_URI = process.env.DB_URL || 'mongodb://localhost:27017/jmt';

async function updateAllSimilarUsers() {
    await mongoose.connect(MONGO_URI);
    const users = await User.find({});
    
    // 좋아요가 가장 많은 메뉴들을 미리 조회 (본인이 좋아요하지 않은 메뉴들만)
    const topLikedMenus = await Menu.find({}).sort({ likeCount: -1 }).limit(20);
    
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

        // top5Ids 유저들의 likedMenus에서 가장 많이 겹치는 메뉴 찾기
        const top5Users = users.filter(u => top5Ids.map(String).includes(String(u._id)));
        const menuCount = new Map();
        
        top5Users.forEach(u => {
            u.likedMenus.forEach(menuId => {
                const menuIdStr = String(menuId);
                // 본인이 이미 좋아요한 메뉴는 제외
                if (!targetLikedMenus.has(menuIdStr)) {
                    menuCount.set(menuIdStr, (menuCount.get(menuIdStr) || 0) + 1);
                }
            });
        });
        
        // 메뉴를 좋아요 횟수순으로 정렬
        const sortedMenus = Array.from(menuCount.entries())
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0]);
        
        let recommendMenus = sortedMenus.slice(0, 3);
        
        // 3개가 안 될 경우 좋아요가 가장 많은 메뉴들로 채우기
        if (recommendMenus.length < 3) {
            const remainingSlots = 3 - recommendMenus.length;
            const recommendMenusSet = new Set(recommendMenus);
            
            const additionalMenus = topLikedMenus
                .filter(menu => !targetLikedMenus.has(String(menu._id)) && !recommendMenusSet.has(String(menu._id)))
                .slice(0, remainingSlots)
                .map(menu => String(menu._id));
            
            recommendMenus = [...recommendMenus, ...additionalMenus];
        }
        
        targetUser.recommendMenus = recommendMenus;

        await targetUser.save();
        console.log(`User ${targetUser._id} updated similarUsers:`, top5Ids);
        console.log(`User ${targetUser._id} recommendMenus count:`, recommendMenus.length);
    }
    await mongoose.disconnect();
    console.log('All users similarUsers update complete.');
}

updateAllSimilarUsers().catch(err => {
    console.error('Error updating similarUsers:', err);
    mongoose.disconnect();
});

module.exports = { updateAllSimilarUsers };
