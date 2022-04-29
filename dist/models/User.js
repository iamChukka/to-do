"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.User = void 0;
const mongoose_1 = require("mongoose");
const config = require("../config/Config");
const jwt = require("jsonwebtoken");
const label = "Password";
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// interface IUserDocument extends IUser {
//   getAuthToken: () => {};
// }
// Define schema for todo items
const userSchema = new mongoose_1.Schema({
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
exports.validateUser = validateUser;
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.TODO_JWTPRIVATEKEY);
    console.log(token, "We are here");
    return token;
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
