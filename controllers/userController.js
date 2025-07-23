// controllers/userController.js
const User = require('../models/User');
const Like = require('../models/Like');
const Review = require('../models/Review');
const Menu = require('../models/Menu'); // Menu 모델 추가
const AWS = require('aws-sdk'); // AWS SDK 임포트
const path = require('path'); // 파일 확장자를 위해 사용

// S3 설정 (환경 변수 사용 권장)
// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION은 환경 변수로 설정되어야 합니다.
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION // 예: 'ap-northeast-2'
});
const S3_BUCKET_NAME = process.env.S3_BUCKET; // S3 버킷 이름



const updateNickname = async (req, res) => {
    const { nickname } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send('사용자를 찾을 수 없습니다.');
    }

    user.nickname = nickname;
    await user.save();
    console.log('닉네임 업데이트:', user);
    res.status(200).json({message: '닉네임이 성공적으로 변경되었습니다.'});
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('사용자 삭제 요청, userId:', userId);
        // 사용자 존재 여부 확인
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        // 관련 데이터 삭제
        await Like.deleteMany({ userId: userId });
        const reviews = await Review.find({ authorId: userId });
        const reviewIds = reviews.map(review => review._id);
        // 모든 메뉴에서 해당 리뷰 ID를 $pull로 제거
        await Menu.updateMany(
            { reviews: { $in: reviewIds } },
            { $pull: { reviews: { $in: reviewIds } } }
        );
        // 리뷰 삭제
        await Review.deleteMany({ authorId: userId });
        
        // 사용자 삭제
        await User.findByIdAndDelete(userId);



        console.log('사용자 및 관련 데이터 삭제 완료:', user);
        res.json({ message: '사용자가 삭제되었습니다.' });
    } catch (err) {
        console.error('사용자 삭제 실패:', err);
        res.status(500).json({ error: '사용자 삭제에 실패했습니다.' });
    }
};

const getUserInfo=async (req, res) => {
    try {
        const userId = req.user._id;

        // 사용자 존재 여부 확인
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        res.status(200).json(user);

    } catch (err) {
        console.error('사용자 정보 반환 실패:', err);
        res.status(500).json({ error: '사용자 정보 반환에 실패했습니다.' });
    }
};

const updateProfileImg = async (req, res) => {
    try {
        const userId = req.user._id;

        const file = req.file; 
        console.log()
        if (!file) {
            return res.status(400).json({ error: '프로필 이미지 파일이 필요합니다.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        // --- 이 부분이 핵심적으로 변경됩니다. ---
        // 사용자 ID를 포함하여 S3 Key (파일명) 생성
        // 항상 동일한 Key를 사용하여 S3에 업로드 시 기존 파일 덮어쓰기
        // 파일 확장자도 유지 (예: .jpg, .png)
        const fileExtension = path.extname(file.originalname);
        const s3Key = `profile-images/${userId}/profile${fileExtension}`; 
        // 예시: profile-images/60d5ec49f8c12a0015b6d7e8/profile.jpg

        const params = {
            Bucket: S3_BUCKET_NAME,
            Key: s3Key, // 고유한 사용자별 Key 사용
            Body: file.buffer, 
            ContentType: file.mimetype,
            ACL: 'public-read' 
        };

        const s3UploadResult = await s3.upload(params).promise(); 

        // 사용자 프로필 이미지 URL 업데이트
        // 이 URL은 S3 Key가 고정되었으므로 항상 동일하게 유지됩니다.
        user.profileImage = s3UploadResult.Location; // 스키마 필드명에 맞게 profileImage로 변경
        await user.save();

        console.log('프로필 이미지 S3 업로드 성공:', s3UploadResult.Location);
        res.status(200).json({ 
            message: '프로필 이미지가 성공적으로 업데이트되었습니다.', 
            profileImgUrl: s3UploadResult.Location 
        });

    } catch (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `파일 업로드 오류: ${err.message}` });
        }
        console.error('프로필 이미지 업데이트 실패:', err);
        res.status(500).json({ error: '프로필 이미지 업데이트에 실패했습니다.' });
    }
};



// 유저의 similarUsers 필드 업데이트
const updateSimilarUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const targetUser = await User.findById(userId);
        if (!targetUser) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }
        const targetLikedMenus = new Set(targetUser.likedMenus.map(String));
        const allUsers = await User.find({ _id: { $ne: userId } });
        const similarities = allUsers.map(user => {
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
        const top5Users = await User.find({ _id: { $in: top5Ids } });
        const recommendedMenuSet = new Set();
        top5Users.forEach(u => {
            u.likedMenus.forEach(menuId => {
                recommendedMenuSet.add(String(menuId));
            });
        });

        // nextRecommendedMenu 필드에 similarUsers들이 좋아요한 메뉴들을 중복 없이 배열로 저장
        const recommendedMenusArr = Array.from(recommendedMenuSet);
        targetUser.recommendMenus = recommendedMenusArr;

        await targetUser.save();
        res.status(200).json({
            message: 'similarUsers가 성공적으로 업데이트되었습니다.',
            similarUsers: top5Ids
        });
    } catch (err) {
        console.error('similarUsers 업데이트 실패:', err);
        res.status(500).json({ error: 'similarUsers 업데이트에 실패했습니다.' });
    }
};


module.exports = { updateNickname, deleteUser, getUserInfo, updateProfileImg, updateSimilarUsers };
