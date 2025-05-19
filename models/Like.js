const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  menuId: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});


module.exports = mongoose.model('Like', likeSchema);