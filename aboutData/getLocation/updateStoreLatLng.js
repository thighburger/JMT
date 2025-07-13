const mongoose = require('mongoose');
const Store = require('../../models/Store');
const fs = require('fs');
require('dotenv').config();

async function main() {
  await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const locations = JSON.parse(fs.readFileSync(__dirname + '/store_locations_with_latlng.json', 'utf-8'));

  for (const loc of locations) {
    if (loc.lat && loc.lng) {
      await Store.findByIdAndUpdate(
        loc._id,
        { $set: { lat: parseFloat(loc.lat), lng: parseFloat(loc.lng) } },
        { new: true }
      );
      console.log(`Updated store ${loc._id} with lat: ${loc.lat}, lng: ${loc.lng}`);
    }
  }

  await mongoose.disconnect();
  console.log('모든 Store에 lat, lng 필드 업데이트 완료!');
}

main();
