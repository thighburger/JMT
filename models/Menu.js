const mongoose = require('mongoose');
const Store = require('./Store');
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default:"https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EA%B0%80%EA%B2%8C%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-04+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+9.55.05.png"
  },
  reviews: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Review',
    default: []
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  heart: {
    type: Boolean,
    default: false
  },
  displayedImg:{
    type:String,
    required:true,
    default:"https://jmt-bucket-01.s3.ap-northeast-2.amazonaws.com/%EA%B0%80%EA%B2%8C%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2025-07-04+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+9.55.05.png"
  }
},);

module.exports = mongoose.model('Menu', menuSchema);