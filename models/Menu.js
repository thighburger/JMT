const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number },
    image: { type: String },
    description: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    likeCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Menu', menuSchema);