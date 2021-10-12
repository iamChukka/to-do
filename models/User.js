//models/User.js
const config = require('../config/Config');
const jwt = require('jsonwebtoken');
const label = 'Password';
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

function validateUser(user) {
  const complexityOptions = {
    min: 5,
    max: 1024,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };

  const Schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions, label),
  });

  return Schema.validate(user);
}

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    config.TODO_JWTPRIVATEKEY
  );
  console.log(token, 'We are here');
  return token;
};
const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser };
