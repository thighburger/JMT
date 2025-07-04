// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const authenticateToken=require('./middleware/auth')
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const recommendRoutes=require('./routes/recommendRoutes');


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { swaggerUi, specs } = require("./swagger/swagger")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

// DB 연결
connectDB(process.env.DB_URL);

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/stores', storeRoutes);

//app.use('/menus/:menuId/reviews', reviewRoutes);
//이렇게하면 404오류뜬다 왜그런걸까 ㅠreq.params.menuId가 undefined로 뜬다
app.use('/menu', reviewRoutes);
app.use('/menus', menuRoutes);
app.use('/recommend',recommendRoutes); 


// 기본 route
app.get('/', (req, res) => {
    res.send('aws 배포 성공~');
});

app.get('/jwttest', authenticateToken, (req, res) => {
    console.log('req:');
    res.json({ message: 'JWT 인증 성공' });
});


// 서버 실행
const PORT = 80;
app.listen(PORT,  () => console.log(`Server running on port ${PORT}`));
