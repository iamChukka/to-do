//models/User.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;