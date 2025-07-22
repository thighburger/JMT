// middleware/distanceCalculator.js
const Store = require('../models/Store');

// Haversine 공식을 사용하여 두 지점 간의 거리를 계산 (m 단위)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // 지구의 반지름 (m)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
};

// 사용자 위치를 기반으로 가게들과의 거리를 계산하는 미들웨어
const calculateStoreDistances = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.query;
        
        // 필수 파라미터 검증
        if (!latitude || !longitude) {
            return res.status(400).json({ 
                error: '위도(latitude)와 경도(longitude)는 필수 쿼리 파라미터입니다.' 
            });
        }

        // 문자열을 숫자로 변환 (쿼리 파라미터는 문자열로 전달됨)
        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);

        // 숫자 변환 검증
        if (isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).json({ 
                error: '위도와 경도는 유효한 숫자여야 합니다.' 
            });
        }

        // 위도/경도 범위 검증
        if (userLat < -90 || userLat > 90) {
            return res.status(400).json({ 
                error: '위도는 -90에서 90 사이의 값이어야 합니다.' 
            });
        }

        if (userLng < -180 || userLng > 180) {
            return res.status(400).json({ 
                error: '경도는 -180에서 180 사이의 값이어야 합니다.' 
            });
        }

        // 사용자 위치 정보를 req에 저장
        req.userLocation = {
            latitude: userLat,
            longitude: userLng
        };

        // 특정 가게와의 거리 계산 함수를 req에 추가
        req.calculateDistance = (storeLat, storeLng) => {
            return calculateDistance(userLat, userLng, storeLat, storeLng);
        };

        // 가게 배열에 거리 정보를 추가하는 헬퍼 함수
        req.addDistanceToStores = (stores) => {
            return stores.map(store => {
                const storeObj = store.toObject ? store.toObject() : store;
                
                // 가게에 위치 정보가 있는 경우만 거리 계산
                if (storeObj.lat && storeObj.lng) {
                    const distanceInMeters = calculateDistance(userLat, userLng, storeObj.lat, storeObj.lng);
                    const roundedDistance = Math.round(distanceInMeters);
                    return {
                        ...storeObj,
                        distance: `${roundedDistance}m` // "500m" 형태로 반환
                    };
                }
                
                return {
                    ...storeObj,
                    distance: null // 위치 정보가 없는 경우
                };
            });
        };

        // 반경 내 가게들을 필터링하는 헬퍼 함수 (radius는 미터 단위)
        req.filterStoresByRadius = (stores, radius = 5000) => {
            const storesWithDistance = stores.map(store => {
                const storeObj = store.toObject ? store.toObject() : store;
                
                if (storeObj.lat && storeObj.lng) {
                    const distanceInMeters = calculateDistance(userLat, userLng, storeObj.lat, storeObj.lng);
                    const roundedDistance = Math.round(distanceInMeters);
                    return {
                        ...storeObj,
                        distance: `${roundedDistance}m`,
                        distanceValue: roundedDistance // 정렬용 숫자 값
                    };
                }
                
                return {
                    ...storeObj,
                    distance: null,
                    distanceValue: null
                };
            });
            
            return storesWithDistance.filter(store => 
                store.distanceValue !== null && store.distanceValue <= radius
            );
        };

        // 거리순으로 정렬하는 헬퍼 함수
        req.sortStoresByDistance = (stores) => {
            return stores.sort((a, b) => {
                // 거리 정보가 없는 가게는 뒤로 정렬
                if (a.distanceValue === null && b.distanceValue === null) return 0;
                if (a.distanceValue === null) return 1;
                if (b.distanceValue === null) return -1;
                return a.distanceValue - b.distanceValue;
            });
        };

        // 사용자 정보 출력 (JWT 토큰에서 사용자 정보 가져오기)
        const userId = req.user ? req.user._id : 'Anonymous';
        console.log(`사용자 위치: 위도 ${userLat}, 경도 ${userLng}, User: ${userId}`);
        next();
    } catch (error) {
        console.error('거리 계산 미들웨어 오류:', error);
        res.status(500).json({ error: '거리 계산 중 오류가 발생했습니다.' });
    }
};

// 반경 필터링 미들웨어 (옵션)
const filterNearbyStores = (defaultRadius = 5000) => {
    return async (req, res, next) => {
        try {
            const { radius = defaultRadius } = req.query;
            const searchRadius = parseFloat(radius);

            if (isNaN(searchRadius) || searchRadius <= 0) {
                return res.status(400).json({ 
                    error: '반경은 0보다 큰 숫자여야 합니다.' 
                });
            }

            // 위치 정보가 있는 가게들만 조회
            const stores = await Store.find({
                lat: { $exists: true, $ne: null },
                lng: { $exists: true, $ne: null }
            });

            // 반경 내 가게들 필터링
            const nearbyStores = req.filterStoresByRadius(stores, searchRadius);
            
            // 거리순으로 정렬
            const sortedStores = req.sortStoresByDistance(nearbyStores);

            // 결과를 req에 저장
            req.nearbyStores = sortedStores;
            req.searchRadius = searchRadius;
            req.totalFound = sortedStores.length;

            next();
        } catch (error) {
            console.error('근처 가게 필터링 미들웨어 오류:', error);
            res.status(500).json({ error: '근처 가게 조회 중 오류가 발생했습니다.' });
        }
    };
};

// 페이지네이션 미들웨어 (옵션)
const paginateStores = (defaultLimit = 20) => {
    return (req, res, next) => {
        try {
            const { limit = defaultLimit, offset = 0 } = req.query;
            const searchLimit = parseInt(limit, 10);
            const searchOffset = parseInt(offset, 10);

            if (isNaN(searchLimit) || searchLimit <= 0) {
                return res.status(400).json({ 
                    error: '제한값은 0보다 큰 정수여야 합니다.' 
                });
            }

            if (isNaN(searchOffset) || searchOffset < 0) {
                return res.status(400).json({ 
                    error: '오프셋은 0 이상의 정수여야 합니다.' 
                });
            }

            // 페이지네이션 적용
            const stores = req.nearbyStores || [];
            const paginatedStores = stores.slice(searchOffset, searchOffset + searchLimit);

            req.paginatedStores = paginatedStores;
            req.pagination = {
                limit: searchLimit,
                offset: searchOffset,
                total: stores.length,
                hasNext: searchOffset + searchLimit < stores.length,
                hasPrev: searchOffset > 0
            };

            next();
        } catch (error) {
            console.error('페이지네이션 미들웨어 오류:', error);
            res.status(500).json({ error: '페이지네이션 처리 중 오류가 발생했습니다.' });
        }
    };
};

module.exports = {
    calculateStoreDistances,
    filterNearbyStores,
    paginateStores,
    calculateDistance
};