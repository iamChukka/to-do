const express = require('express');

const UserController = require('../controllers/userControllers');
const router = express.Router();

router.post('/', UserController.createUser);

module.exports = router;
