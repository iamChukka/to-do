//repositories/UserRepository

const { User, validateUser } = require('../models/User');
// const  = require('../models/User');

const createError = (msg, obj) => {
  const message = new Error(msg);
  //console.log(message);
  let err = {
    message,
    //...obj,
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
      if (error) throw createError('Validation failed', error);

      let user = await User.findOne({ email: req.body.email });
      if (user) throw createError('User Already registered');

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //user = new this.model(newUser);

      //await newUser.save();
      return res
        .status(201)
        .json({ message: 'User created Successfully', data: newUser });
    } catch (e) {
      //console.log(e);
      return res.status(400).json(e);
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
