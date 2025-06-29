// models/Store.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// const storeSchema = new Schema({
//     name: { type: String, required: true },
//     location: { type: String, required: true },
//     menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }], // 배열로 수정
//     image: { type: String }
// });

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
