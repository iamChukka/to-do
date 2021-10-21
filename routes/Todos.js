const auth = require('../middleware/auth');
const express = require('express');

//const app = express.Router();
const router = express.Router();

//set view engine to ejs
//app.set('view engine', 'ejs');

const todoControllers = require('../controllers/todoControllers');

const authenticated = require('../middleware/authenticate');

const checkAuthenticated = authenticated.checkAuthenticated;
const checkNotAuthenticated = authenticated.checkNotAuthenticated;

// add a todo item
router.post('/', auth, todoControllers.createTodo);

//get all items User added
router.get('/', auth, todoControllers.getTodosByUserId);

// delete a todo item
router.delete('/:id', auth, todoControllers.deleteTodo);

// update a todo item
router.put('/:id', auth, todoControllers.updateTodo);

module.exports = router;
