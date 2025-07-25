const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Menu = require('../../models/Menu');
require('dotenv').config();

const MONGO_URI = process.env.DB_URL || 'mongodb://localhost:27017/jmt';

async function exportMenuNamesAndIds() {
    await mongoose.connect(MONGO_URI);
    const menus = await Menu.find({}, { _id: 1, name: 1 });
    const result = menus.map(menu => ({ _id: menu._id.toString(), name: menu.name }));
    const outputPath = path.join(__dirname, 'menu.js');
    fs.writeFileSync(outputPath, 'module.exports = ' + JSON.stringify(result, null, 2) + ';\n');
    console.log(`메뉴 데이터가 ${outputPath}에 저장되었습니다.`);
    await mongoose.disconnect();
}

exportMenuNamesAndIds();