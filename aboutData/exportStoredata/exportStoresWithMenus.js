const mongoose = require('mongoose');
const Store = require('../../models/Store');
const Menu = require('../../models/Menu');
require('dotenv').config();
const fs = require('fs');

async function main() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  // Store 전체를 menus까지 populate해서 가져오기
  const stores = await Store.find().populate('menus').lean();

  // 파일로 저장 (JS 파일로 내보내기)
  const output = 'module.exports = ' + JSON.stringify(stores, null, 2) + ';\n';
  const outputPath = require('path').join(__dirname, 'storesWithMenus.js');
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log('저장 완료: storesWithMenus.js');
  await mongoose.disconnect();
}

main();
