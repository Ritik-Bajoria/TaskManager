const mongoose = require('mongoose');
require('dotenv').config();


// Schema
const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, { timestamps: true });
  
  
  // Model
  const User = mongoose.model("User", userSchema);

  module.exports = User;