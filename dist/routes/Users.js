"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
const auth = require("../middleware/auth");
const UserController = require("../controllers/userControllers");
const router = express_1.default.Router();
router.post("/", UserController.createUser);
router.get("/me", auth, UserController.getUser);
module.exports = router;
