// models/Store.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


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
      required: true
    },
    foodCategory: {
      type: String,
      default: '기타' 
    }
  });

module.exports = mongoose.model('Store', storeSchema);
