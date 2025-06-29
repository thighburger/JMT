// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menuId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
}
    //닉네임변경하면 author의 nickname도 변경되야함
});



module.exports = mongoose.model('Review', reviewSchema);
