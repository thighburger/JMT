const mongoose = require('mongoose');
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
    type: [String],
    default: []
  },
  likeCount: {
    type: Number,
    default: 0
  },
  heart: {
    type: Boolean,
    default: false
  }
},);

module.exports = mongoose.model('Menu', menuSchema);