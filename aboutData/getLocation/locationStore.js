const mongoose = require('mongoose');
const Store = require('../../models/Store');
const fs = require('fs');
require('dotenv').config();

async function exportStoreLocations() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const stores = await Store.find({}, { _id: 1, location: 1 }).lean();

  // 원하는 파일 포맷에 맞게 변환 (여기서는 JSON)
  const outputPath = require('path').join(__dirname, 'store_locations.json');
  fs.writeFileSync(outputPath, JSON.stringify(stores, null, 2), 'utf-8');

  console.log('저장 완료: store_locations.json');
  mongoose.disconnect();
}

exportStoreLocations();