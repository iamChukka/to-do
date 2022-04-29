//const express = require('express');
import express from "express";
const auth = require("../middleware/auth");

const UserController = require("../controllers/userControllers");
const router = express.Router();

router.post("/", UserController.createUser);

router.get("/me", auth, UserController.getUser);

module.exports = router;
