"use strict";
//models/Todo.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
//const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
// Define schema for todo items
const todoSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    done: {
        type: Boolean,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
});
const Todo = (0, mongoose_1.model)("Todo", todoSchema);
exports.Todo = Todo;
