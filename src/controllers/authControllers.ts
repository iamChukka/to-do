import { User } from "../models/User";

import bcrypt from "bcrypt";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import createError from "../handlers/errorHandler";
import createResponse from "../handlers/responseHandler";
const label = "Password";

class AuthController {
  // create a new user
  static async authenticateUser(req: any, res: any) {
    try {
      const { error } = validate(req.body);
      if (error)
        // return res
        //   .status(400)
        //   .json('Validation failed ' + error.details[0].message);
        throw createError("Validation failed", 403);

      let user = await User.findOne({ email: req.body.email });
      if (!user)
        //return res.status(400).send('Invalid Email or password');
        throw createError("Invalid Email or password", 400);

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword)
        //return res.status(400).json('Invalid Email or password');
        throw createError("Invalid Email or password", 403);

      const token = user.generateAuthToken();

      return createResponse({
        res: res,
        code: 201,
        message: "User Successfully Authenticated",
        token: token,
      });
    } catch (error: any) {
      console.log(error + " You are catching this in authController");
      //let err = createError("You are in Authenticate", 400);
      // return res.status(error.code).json(error.message);
      return createResponse({
        res: res,
        code: error.code,
        message: error.message,
        data: error,
      });
    }
  }
}

function validate(req: any) {
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

export default AuthController;
