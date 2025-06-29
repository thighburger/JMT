// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Menu = require('./Menu');  // Menu 모델을 불러오기
const Review = require('./Review');  // Review 모델을 불러오기


const userSchema = new Schema({
    kakaoId: { type: String, unique: true },
    nickname: { type: String, default: '익명' },
    profileImage: { type: String, default: 'https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EC%9C%A0%EC%A0%80%ED%94%84%EB%A1%9C%ED%95%84/icons8-person-64.png' }, // 기본 프로필 이미지 URL
});

module.exports = mongoose.model('User', userSchema);
