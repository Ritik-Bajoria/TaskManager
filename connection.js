const mongoose = require('mongoose');

exports.connectMongoDB = async (url)=>{
    const connection = await mongoose.connect(url);
    return connection;
}