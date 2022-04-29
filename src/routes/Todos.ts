import express from "express";
import auth from "../middleware/auth";
// const express = require('express');

//const app = express.Router();
const router = express.Router();

import todoControllers from "../controllers/todoControllers";

// add a todo item
router.post("/", auth, todoControllers.createTodo);

//get all items User added
router.get("/", auth, todoControllers.getTodosByUserId);

// delete a todo item
router.delete("/:id", auth, todoControllers.deleteTodo);

// update a todo item
router.put("/:id", auth, todoControllers.updateTodo);

module.exports = router;
