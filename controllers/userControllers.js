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
  // constructor(model) {
  //   this.model = model;
  // }

  // create a new user
  static async createUser(req, res) {
    try {
      const { error } = validateUser(req.body);
      if (error)
        throw createError('Validation failed', error.details[0].message);

      let user = await User.findOne({ email: req.body.email });
      if (user) throw createError('User Already registered');

      const newUser = await User.create(
        _.pick(req.body, ['name', 'email', 'password'])
      );

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      await newUser.save();

      //console.log(salt);
      //console.log(newUser.password);
      //user = new this.model(newUser);

      return res.status(201).json({
        message: 'User created Successfully',
        data: _.pick(newUser, ['_id', 'name', 'email']),
      });
    } catch (error) {
      //console.log(e);
      return res.status(400).json(error);
    }
  }

  // return all users

  // findAll() {
  //   return this.model.find();
  // }

  // //find users by the id
  // findById(id) {
  //   return this.model.findById(id);
  // }

  // // delete user
  // deleteById(id) {
  //   return this.model.findByIdAndDelete(id);
  // }

  // //update user
  // updateById(id, object) {
  //   const query = { _id: id };
  //   return this.model.findOneAndUpdate(query, {
  //     $set: {
  //       name: object.name,
  //       email: object.email,
  //       password: object.password,
  //     },
  //   });
  // }
}

module.exports = UserController;
// module.exports = createError;
