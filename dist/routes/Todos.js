"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth = require("../middleware/auth");
// const express = require('express');
//const app = express.Router();
const router = express_1.default.Router();
//set view engine to ejs
//app.set('view engine', 'ejs');
const todoControllers = require("../controllers/todoControllers");
const authenticated = require("../middleware/authenticate");
const checkAuthenticated = authenticated.checkAuthenticated;
const checkNotAuthenticated = authenticated.checkNotAuthenticated;
// add a todo item
router.post("/", auth, todoControllers.createTodo);
//get all items User added
router.get("/", auth, todoControllers.getTodosByUserId);
// delete a todo item
router.delete("/:id", auth, todoControllers.deleteTodo);
// update a todo item
router.put("/:id", auth, todoControllers.updateTodo);
module.exports = router;
