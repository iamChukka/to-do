const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const label = "Password";
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const createError = (msg, code = 403) => {
  const err = new Error(msg);
  //console.log(message);
  err.code = code;
  //console.log(err);
  return err;
};

class AuthController {
  // create a new user
  static async authenticateUser(req, res) {
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

      return res.send(token);
    } catch (error) {
      return res.status(error.code).json(error.message);
    }
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

module.exports = AuthController;
