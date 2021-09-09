const express = require('express');

const AuthController = require('../controllers/authControllers');
const router = express.Router();

router.post('/', AuthController.authenticateUser);

module.exports = router;
