//models/Todo.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define schema for todo items
const todoSchema = new Schema({
  name: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  // user: {
  //   type: new mongoose.Schema({
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //   }),
  // },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
