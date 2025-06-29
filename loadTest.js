// const axios = require('axios');

// const BASE_URL = 'http://52.79.206.198/menu'; // API의 기본 URL
// const menuId = '683537fd1e592f5fc8275140'; // 테스트할 메뉴 ID
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkNmRiM2ExNGIwYWQzZWIxNWEzMTYiLCJhY2Nlc3NUb2tlbiI6IjRDa05zRV9FWEx2T2xSbVJSS2tJVzRTeTk0Q1Njc2FjQUFBQUFRb05JZGtBQUFHV19RbXE2eXJkNFhXLU9vOUciLCJpYXQiOjE3NDgwMDE5OTEsImV4cCI6MTc0ODYwNjc5MX0.nTmuqm3fR9Y6_6LMCbtuWPYJ4q1x15QjzZg-7eNB-GY'; // 인증 토큰

// // 좋아요 요청
// const likeMenu = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/${menuId}/like`, {}, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     console.log('Like Response:', response.data);
//   } catch (error) {
//     console.error('Like Error:', error.response?.data || error.message);
//   }
// };

// // 좋아요 취소 요청
// const unlikeMenu = async () => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/${menuId}/unlike`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     console.log('Unlike Response:', response.data);
//   } catch (error) {
//     console.error('Unlike Error:', error.response?.data || error.message);
//   }
// };

// // 부하 테스트 실행
// const runLoadTest = async () => {
//   const promises = [];
//   const requestCount = 1000; // 동시에 실행할 요청 수

//   for (let i = 0; i < requestCount; i++) {
//     promises.push(likeMenu());
//     promises.push(unlikeMenu());
//   }

//   await Promise.all(promises);
//   console.log('Load test completed.');
// };

// runLoadTest();

const axios = require('axios');

const BASE_URL = 'http://52.79.206.198/menu'; // API의 기본 URL
const menuId = '683537fd1e592f5fc8275140'; // 테스트할 메뉴 ID
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODJkNmRiM2ExNGIwYWQzZWIxNWEzMTYiLCJhY2Nlc3NUb2tlbiI6IjRDa05zRV9FWEx2T2xSbVJSS2tJVzRTeTk0Q1Njc2FjQUFBQUFRb05JZGtBQUFHV19RbXE2eXJkNFhXLU9vOUciLCJpYXQiOjE3NDgwMDE5OTEsImV4cCI6MTc0ODYwNjc5MX0.nTmuqm3fR9Y6_6LMCbtuWPYJ4q1x15QjzZg-7eNB-GY'; // 인증 토큰

// 요청 시간 측정 함수
const measureRequestTime = async (requestFunc) => {
  const startTime = Date.now();
  await requestFunc();
  const endTime = Date.now();
  return endTime - startTime;
};

// 좋아요 요청
const likeMenu = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/${menuId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Like Response:', response.data);
  } catch (error) {
    console.error('Like Error:', error.response?.data || error.message);
  }
};

// 좋아요 취소 요청
const unlikeMenu = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/${menuId}/unlike`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Unlike Response:', response.data);
  } catch (error) {
    console.error('Unlike Error:', error.response?.data || error.message);
  }
};

// 성능 테스트 실행
const runPerformanceTest = async () => {
  const requestCount = 100; // 실행할 요청 수
  let totalLikeTime = 0;
  let totalUnlikeTime = 0;

  for (let i = 0; i < requestCount; i++) {
    totalLikeTime += await measureRequestTime(likeMenu);
    totalUnlikeTime += await measureRequestTime(unlikeMenu);
  }

  console.log(`Average Like Request Time: ${(totalLikeTime / requestCount).toFixed(2)} ms`);
  console.log(`Average Unlike Request Time: ${(totalUnlikeTime / requestCount).toFixed(2)} ms`);
};

runPerformanceTest();