//repositories/TodoController

const Todo = require('../models/Todo');
class TodoController {
  static async createTodo(req, res) {
    try {
      //const user = req.user;
      const { name } = req.body;
      const todo = await Todo.create({ name: name, userId: req.user._id });

      todo.save();
      return res.status(201).json({ todo });
    } catch (ex) {}
  }

  static async getTodosByUserId(req, res) {
    try {
      //const user = req.user;
      //const { name } = req.body;
      const todo = await Todo.find({ userId: req.user._id });

      return res.status(200).json({ todo });
    } catch (ex) {}
  }

  static async deleteTodo(req, res) {
    try {
      const id = req.params.id;
      const todo = await Todo.findById(id);

      if (todo.userId.toString() !== req.user._id)
        return res
          .status(403)
          .json({ message: 'You are not authorised to change' });

      await Todo.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: 'Successfully Deleted Todo', data: todo });
    } catch (ex) {}
  }
  static async updateTodo(req, res) {
    try {
      const id = req.params.id;

      let todo = await Todo.findById(id);

      if (todo.userId.toString() !== req.user._id)
        return res
          .status(403)
          .json({ message: 'You are not authorised to change' });

      const newTodo = req.body;
      await Todo.findByIdAndUpdate(id, {
        $set: { name: newTodo.name },
      });
      todo = await Todo.findById(id);
      return res
        .status(200)
        .json({ message: 'Successfully Edited Todo', data: todo });
    } catch (ex) {}
  }
}

// class TodoRepository {
//   constructor(model) {
//     this.model = model;
//   }

//   // create a new todo
//   create(name) {
//     const newTodo = {
//       name,
//       done: false,
//     };
//     const todo = new this.model(newTodo);

//     return todo.save();
//   }

//   // return all todos

//   findAll() {
//     return this.model.find();
//   }

//   //find todo by the id
//   findById(id) {
//     return this.model.findById(id);
//   }

//   // delete todo
//   deleteById(id) {
//     return this.model.findByIdAndDelete(id);
//   }

//   //update todo
//   updateById(id, object) {
//     const query = { _id: id };
//     return this.model.findOneAndUpdate(query, {
//       $set: { name: object.name, done: object.done },
//     });
//   }
// }

// module.exports = new TodoRepository(Todo);
module.exports = TodoController;
