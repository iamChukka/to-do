"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
// const express = require('express');
//const app = express.Router();
const router = express_1.default.Router();
const todoControllers_1 = __importDefault(require("../controllers/todoControllers"));
// add a todo item
router.post("/", auth_1.default, todoControllers_1.default.createTodo);
//get all items User added
router.get("/", auth_1.default, todoControllers_1.default.getTodosByUserId);
// delete a todo item
router.delete("/:id", auth_1.default, todoControllers_1.default.deleteTodo);
// update a todo item
router.put("/:id", auth_1.default, todoControllers_1.default.updateTodo);
module.exports = router;
