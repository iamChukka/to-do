//models/User.js
import { Schema, model, Model } from "mongoose";

import config from "../config/Config";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const label = "Password";
//const mongoose = require('mongoose');

interface IUser {
  name: string;
  email: string;
  password: string;
  generateAuthToken: () => {};
}

// interface IUserDocument extends IUser {
//   getAuthToken: () => {};
// }

// Define schema for todo items
const userSchema: Schema = new Schema<IUser>({
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

function validateUser(user: any) {
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
  const token = jwt.sign({ _id: this._id }, config.TODO_JWTPRIVATEKEY);
  console.log(token, "We are here");
  return token;
};
const User = model<IUser>("User", userSchema);

export { User, validateUser };
