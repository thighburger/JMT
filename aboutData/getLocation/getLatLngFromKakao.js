const fs = require('fs');
const axios = require('axios');
require('dotenv').config();


// 카카오 REST API 키를 입력하세요 (Kakao Developers에서 발급)
const KAKAO_API_KEY = process.env.REST_API_KEY;

async function getLatLng(address) {
  try {
    const res = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
      params: { query: address },
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` }
    });
    const doc = res.data.documents[0];
    if (doc) {
      return { lat: doc.y, lng: doc.x };
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
    // 너무 빠른 요청 방지 (카카오 정책)
    await new Promise(r => setTimeout(r, 200));
  }

  fs.writeFileSync(__dirname + '/store_locations_with_latlng.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('저장 완료: store_locations_with_latlng.json');
}

main();
