const express = require('express');

//const app = express.Router();
const mongoose = require('mongoose');
const UserController = require('../controllers/userControllers');
const router = express.Router();

router.post('/', UserController.createUser);

module.exports = router;
