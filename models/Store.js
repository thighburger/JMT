// models/Store.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }], // 배열로 수정
    image: { type: String }
});

module.exports = mongoose.model('Store', storeSchema);
