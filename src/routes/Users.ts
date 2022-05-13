//const express = require('express');
import express from "express";
import auth from "../middleware/auth";

import userController from "../controllers/userControllers";
const router = express.Router();

router.post("/", userController.createUser);

router.get("/me", auth, userController.getUser);

export default router;
