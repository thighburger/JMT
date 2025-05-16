const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: '토큰 없음' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log('토큰 검증 실패:', err);
        return res.status(403).json({ message: '토큰 유효하지 않음' });
      }
      
      req.user = user; // user 정보 request에 저장
      next();
    });
  }

  module.exports=authenticateToken;