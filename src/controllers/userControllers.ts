//import { NextFunction } from "express";
import { User, validateUser } from "../models/User";
import bcrypt from "bcrypt";
import _ from "lodash";
import createError from "../handlers/errorHandler";
import createResponse from "../handlers/responseHandler";

//const config = require('../config/Config');

// class customError extends Error {
//   message: string;
//   code: number;

//   constructor(msg: string, code: any) {
//     super(msg);
//     //Object.setPrototypeOf(this, customError.prototype);
//     this.message = msg;
//     this.code = code;
//   }
// }
// const createError = (msg: string, code: any) => {
//   const err = new customError(msg, code);
//   return err;
// };

// const createError = (msg: any, code: any = 403) => {
//   const err = new Error(msg);
//   err.code = code;
//   return err;
// };

class UserController {
  // create a new user
  static async createUser(req: any, res: any, next: any) {
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
        throw createError("Validation failed", 422);

      let user = await User.findOne({ email: req.body.email });
      if (user) throw createError("User Already registered", 400);

      user = await User.create(_.pick(req.body, ["name", "email", "password"]));

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      console.log(user);

      const token = user.generateAuthToken();

      // return res
      //   .status(201)
      //   .header({ "x-auth-token": token })
      //   .json({
      //     message: "User created Successfully",
      //     data: _.pick(user, ["_id", "name", "email"]),
      //   });

      return createResponse({
        res: res,
        code: 201,
        header: { "x-auth-token": token },
        message: "User created Successfully",
        data: _.pick(user, ["_id", "name", "email"]),
        token: token,
      });
    } catch (error: any) {
      console.log(error + " You are catching this in userController");
      //let err = createError("You  are in  User Controller", 400);
      // return res.status(error.code).json(error.message);
      return createResponse({
        res: res,
        code: error.code,
        message: error.message,
        data: error,
      });
    }
  }
  static async getUser(req: any, res: any) {
    const user = await User.findById(req.user._id).select("-password");
    // res.send(user);
    return createResponse({
      res: res,
      code: 200,
      message: "Here I am",
      data: user,
    });
  }
}

export default UserController;
// module.exports = createError;
