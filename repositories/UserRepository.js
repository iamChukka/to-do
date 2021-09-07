//repositories/UserRepository

const User = require('../models/User');

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  // create a new user
  create(object) {
    const newUser = {
      name: object.name,
      email: object.email,
      password: object.password,
    };
    const user = new this.model(newUser);

    return user.save();
  }

  // return all users

  findAll() {
    return this.model.find();
  }

  //find users by the id
  findById(id) {
    return this.model.findById(id);
  }

  // delete user
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update user
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, {
      $set: {
        name: object.name,
        email: object.email,
        password: object.password,
      },
    });
  }
}

module.exports = new UserRepository(User);
