// models/Store.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

//
const storeSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    menus: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Menu',
      default: []
    },
    image: {
      type: String,
      default:"https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EA%B0%80%EA%B2%8C%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-04+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+9.55.05.png"
    },
    isAllowed: {
      type: Boolean,
      default: false // 기본적으로 사진 허락을 받지 않았다고 가정
    },
    likeSum: {
      type: Number,
      default: 0
    },
    locationCategory: {
      type: String,
      required: true,
      default:"기타"
    },
    foodCategory: {
      type: String,
      default: '기타' 
    },
    displayedImg:{
      type:String,
      required:true,
      default:"https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EA%B0%80%EA%B2%8C%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-04+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+9.55.05.png"
    },
    lat: {
      type: Number,
      default: null
    },
    lng: {
      type: Number,
      default: null
    }
  });

module.exports = mongoose.model('Store', storeSchema);
