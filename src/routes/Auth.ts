//const express = require('express');
import express from "express";
import AuthController from "../controllers/authControllers";
const router = express.Router();

router.post("/", AuthController.authenticateUser);

module.exports = router;
