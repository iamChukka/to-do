"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const bcrypt = require("bcrypt");
const label = "Password";
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// const createError = (msg, code = 403) => {
//   const err = new Error(msg);
//   //console.log(message);
//   err.code = code;
//   //console.log(err);
//   return err;
// };
class customError extends Error {
    constructor(msg, code) {
        super(msg);
        //Object.setPrototypeOf(this, customError.prototype);
        this.message = msg;
        this.code = code;
    }
}
const createError = (msg, code) => {
    const err = new customError(msg, code);
    return err;
};
class AuthController {
    // create a new user
    static authenticateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validate(req.body);
                if (error)
                    // return res
                    //   .status(400)
                    //   .json('Validation failed ' + error.details[0].message);
                    throw createError("Validation failed", 403);
                let user = yield User_1.User.findOne({ email: req.body.email });
                if (!user)
                    //return res.status(400).send('Invalid Email or password');
                    throw createError("Invalid Email or password", 400);
                const validPassword = yield bcrypt.compare(req.body.password, user.password);
                if (!validPassword)
                    //return res.status(400).json('Invalid Email or password');
                    throw createError("Invalid Email or password", 403);
                const token = user.generateAuthToken();
                return res.send(token);
            }
            catch (error) {
                console.log(error + " You are catching this in authController");
                //let err = createError("You are in Authenticate", 400);
                return res.status(error.code).json(error.message);
            }
        });
    }
}
function validate(req) {
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
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions, label),
    });
    return Schema.validate(req);
}
exports.default = AuthController;
