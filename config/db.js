// config/db.js
const mongoose = require('mongoose');

const connectDB = async (dbUrl) => {
    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;