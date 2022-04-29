//repositories/TodoController

const Todo = require("../models/Todo");
class TodoController {
  static async createTodo(req: any, res: any) {
    try {
      //const user = req.user;
      const { name } = req.body;
      const todo = await Todo.create({ name: name, userId: req.user._id });

      todo.save();
      return res.status(201).json({ todo });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  static async getTodosByUserId(req: any, res: any) {
    try {
      //const user = req.user;
      //const { name } = req.body;
      const todo = await Todo.find({ userId: req.user._id });
      //console.log(todo);
      return res.status(200).json({ todo });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  static async deleteTodo(req: any, res: any) {
    try {
      const id = req.params.id;
      const todo = await Todo.findById(id);

      if (todo.userId.toString() !== req.user._id)
        return res
          .status(403)
          .json({ message: "You are not authorised to change" });

      await Todo.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "Successfully Deleted Todo", data: todo });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
  static async updateTodo(req: any, res: any) {
    try {
      const id = req.params.id;

      let todo = await Todo.findById(id);

      if (todo.userId.toString() !== req.user._id)
        return res
          .status(403)
          .json({ message: "You are not authorised to change" });

      const newTodo = req.body;
      await Todo.findByIdAndUpdate(id, {
        $set: { name: newTodo.name },
      });
      todo = await Todo.findById(id);
      return res
        .status(200)
        .json({ message: "Successfully Edited Todo", data: todo });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
}

module.exports = TodoController;
