//const config = require('../config/Config');
const _ = require('lodash');
const { User, validateUser } = require('../models/User');
const bcrypt = require('bcrypt');

const createError = (msg, obj) => {
  const message = new Error(msg);
  //console.log(message);
  let err = {
    message: message,
    detail: obj,
  };
  console.log(err);
  return err;
};

class UserController {
  // create a new user
  static async createUser(req, res) {
    try {
      const { error } = validateUser(req.body);
      if (error)
        return res
          .status(400)
          .json({ message: 'Validation failed ' + error.details[0].message });
      //throw createError('Validation failed', error.details[0].message);

      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res.status(400).json({ message: 'User Already registered' });
      // throw createError('User Already registered');

      user = await User.create(_.pick(req.body, ['name', 'email', 'password']));

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      console.log(user);

      const token = user.generateAuthToken();

      return res
        .status(201)
        .header({ 'x-auth-token': token })
        .json({
          message: 'User created Successfully',
          data: _.pick(user, ['_id', 'name', 'email']),
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  static async getUser(req, res) {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  }
}

module.exports = UserController;
// module.exports = createError;
