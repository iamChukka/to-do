"use strict";
//repositories/TodoController
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo = require("../models/Todo");
class TodoController {
    static createTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const user = req.user;
                const { name } = req.body;
                const todo = yield Todo.create({ name: name, userId: req.user._id });
                todo.save();
                return res.status(201).json({ todo });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json(error);
            }
        });
    }
    static getTodosByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const user = req.user;
                //const { name } = req.body;
                const todo = yield Todo.find({ userId: req.user._id });
                //console.log(todo);
                return res.status(200).json({ todo });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json(error);
            }
        });
    }
    static deleteTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const todo = yield Todo.findById(id);
                if (todo.userId.toString() !== req.user._id)
                    return res
                        .status(403)
                        .json({ message: "You are not authorised to change" });
                yield Todo.findByIdAndDelete(id);
                return res
                    .status(200)
                    .json({ message: "Successfully Deleted Todo", data: todo });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json(error);
            }
        });
    }
    static updateTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let todo = yield Todo.findById(id);
                if (todo.userId.toString() !== req.user._id)
                    return res
                        .status(403)
                        .json({ message: "You are not authorised to change" });
                const newTodo = req.body;
                yield Todo.findByIdAndUpdate(id, {
                    $set: { name: newTodo.name },
                });
                todo = yield Todo.findById(id);
                return res
                    .status(200)
                    .json({ message: "Successfully Edited Todo", data: todo });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json(error);
            }
        });
    }
}
exports.default = TodoController;
