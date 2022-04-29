"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const router = express_1.default.Router();
router.post("/", userControllers_1.default.createUser);
router.get("/me", auth_1.default, userControllers_1.default.getUser);
module.exports = router;
