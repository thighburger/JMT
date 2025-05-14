// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();


const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const menuRoutes = require('./routes/menuRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

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
app.use('/oauth', authRoutes);
app.use('/user', userRoutes);
app.use('/stores', storeRoutes);
app.use('/:menuId', menuRoutes);
//app.use('/reviews', reviewRoutes);

// 기본 route
app.get('/', (req, res) => {
    res.send('aws 배포 성공~');
});

// 서버 실행
const PORT = 80;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
