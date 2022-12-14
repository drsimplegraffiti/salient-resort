const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
const connectDB = async () => {
    try {
        let db_url = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/react';
        const conn = await mongoose.connect(db_url);
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
    
module.exports = connectDB;