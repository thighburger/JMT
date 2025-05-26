const mongoose = require('mongoose');
const Store = require('./Store');
const { Schema } = mongoose;

// const menuSchema = new Schema({
//     name: { type: String, required: true },
//     price: { type: Number },
//     image: { type: String },
//     description: { type: String },
//     reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
//     likeCount: { type: Number, default: 0 },
//     likedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
// });

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
    required: true
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
  }
},);

module.exports = mongoose.model('Menu', menuSchema);