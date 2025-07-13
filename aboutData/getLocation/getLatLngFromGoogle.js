const fs = require('fs');
const axios = require('axios');
require('dotenv').config();



// 구글 Maps Geocoding API 키를 .env에 GOOGLE_API_KEY로 저장하세요
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function getLatLng(address) {
  try {
    const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: GOOGLE_API_KEY
      }
    });
    const result = res.data.results[0];
    if (result) {
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng
      };
    }
    return { lat: null, lng: null };
  } catch (err) {
    console.error('Geocoding error:', address, err.response?.data || err.message);
    return { lat: null, lng: null };
  }
}

async function main() {
  const stores = JSON.parse(fs.readFileSync(__dirname + '/store_locations.json', 'utf-8'));
  const results = [];

  for (const store of stores) {
    const { lat, lng } = await getLatLng(store.location);
    results.push({
      _id: store._id,
      location: store.location,
      lat,
      lng
    });
    console.log(`${store.location} => lat: ${lat}, lng: ${lng}`);
    // 너무 빠른 요청 방지 (구글도 QPS 제한이 있으니 200ms 대기)
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(__dirname + '/store_locations_with_latlng.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('저장 완료: store_locations_with_latlng.json');
}

main();
