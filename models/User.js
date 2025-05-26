// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Menu = require('./Menu');  // Menu 모델을 불러오기
const Review = require('./Review');  // Review 모델을 불러오기


const userSchema = new Schema({
    kakaoId: { type: String, unique: true },
    nickname: { type: String, default: '익명' }
});

module.exports = mongoose.model('User', userSchema);
