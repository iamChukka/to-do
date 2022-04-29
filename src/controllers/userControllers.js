//const config = require('../config/Config');
const _ = require("lodash");
const { User, validateUser } = require("../models/User");
const bcrypt = require("bcrypt");

const createError = (msg, code = 403) => {
  const err = new Error(msg);
  //console.log(message);
  err.code = code;
  //console.log(err);
  return err;
};

class UserController {
  // create a new user
  static async createUser(req, res, next) {
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

      let user = await User.findOne({ email: req.body.email });
      if (user)
        // return (
        //   res
        //     .status(400)
        //     //.json({ message: 'User Already registered' });
        //     .json(createError("User Already registered", 500))
        // );
        throw createError("User Already registered", 403);

      user = await User.create(_.pick(req.body, ["name", "email", "password"]));

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      console.log(user);

      const token = user.generateAuthToken();

      return res
        .status(201)
        .header({ "x-auth-token": token })
        .json({
          message: "User created Successfully",
          data: _.pick(user, ["_id", "name", "email"]),
        });
    } catch (error) {
      console.log(error + " You are catching this");
      return res.status(error.code).json(error.message);
    }
  }
  static async getUser(req, res) {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  }
}

module.exports = UserController;
// module.exports = createError;
