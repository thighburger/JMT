const mongoose = require('mongoose');
const Menu = require('../../models/Menu');
const menuList = require('./menu.js');
require('dotenv').config();

const MONGO_URI = process.env.DB_URL || 'mongodb://localhost:27017/jmt';

async function deleteMenusNotInList() {
    await mongoose.connect(MONGO_URI);
    const menuIds = menuList.map(menu => menu._id);
    const result = await Menu.deleteMany({ _id: { $nin: menuIds } });
    console.log(`menu.js에 없는 메뉴 ${result.deletedCount}개를 삭제했습니다.`);
    await mongoose.disconnect();
}

deleteMenusNotInList();