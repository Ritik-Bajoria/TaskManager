const mongoose = require('mongoose');

exports.connectMongoDB = async (url)=>{
    return mongoose.connect(url);
}