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
//const config = require('../config/Config');
const _ = require("lodash");
const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");
const createError = (msg, code = 403) => {
    const err = new Error(msg);
    // @ts-ignore
    err.code = code;
    return err;
};
class UserController {
    // create a new user
    static createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validateUser(req.body);
                //console.log(error);
                if (error)
                    // return (
                    //   res
                    //     .status(400)
                    //     //.json({ message: 'Validation failed ' + error.details[0].message });
                    //     .json(createError("Validation failed", error.details[0].message))
                    // );
                    throw createError("Validation failed", 400);
                let user = yield User.findOne({ email: req.body.email });
                if (user)
                    // return (
                    //   res
                    //     .status(400)
                    //     //.json({ message: 'User Already registered' });
                    //     .json(createError("User Already registered", 500))
                    // );
                    throw createError("User Already registered", 403);
                user = yield User.create(_.pick(req.body, ["name", "email", "password"]));
                const salt = yield bcrypt.genSalt(10);
                user.password = yield bcrypt.hash(user.password, salt);
                yield user.save();
                console.log(user);
                const token = user.generateAuthToken();
                return res
                    .status(201)
                    .header({ "x-auth-token": token })
                    .json({
                    message: "User created Successfully",
                    data: _.pick(user, ["_id", "name", "email"]),
                });
            }
            catch (error) {
                console.log(error + " You are catching this");
                return res.status(error.code).json(error.message);
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findById(req.user._id).select("-password");
            res.send(user);
        });
    }
}
module.exports = UserController;
// module.exports = createError;
