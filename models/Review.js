// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

module.exports = mongoose.model('Review', reviewSchema);
