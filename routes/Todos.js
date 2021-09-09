const express = require('express');

//const app = express.Router();
const router = express.Router();

//set view engine to ejs
//app.set('view engine', 'ejs');

const todoRepository = require('../controllers/todoControllers');

const authenticated = require('../authenticate');

const checkAuthenticated = authenticated.checkAuthenticated;
const checkNotAuthenticated = authenticated.checkNotAuthenticated;

// get all todo items in the db
router.get('/', checkAuthenticated, (req, res) => {
  try {
    todoRepository.findAll().then((todos) => {
      //res.json(todos);
      let userTodo = [];
      for (let i = 0; i < todos.length; i++) {
        if (req.user.id == todos[i].user.id) {
          userTodo.push(todos[i]);
        }
        // console.log('req', req.user.id);
        // console.log('todo ', todos[i].user.id);
      }
      //console.log(userTodo);
      // return res.render('pages/index', {
      //   mascots: userTodo,
      //   //name: req.user.name
      //   //tagline: tagline,
      // });
      return res.json(userTodo);
    });
  } catch (e) {
    console.log('Errors everyday');
  }
});

// add a todo item
router.post('/', (req, res) => {
  const user = req.user;
  const { name } = req.body;
  //console.log(id);
  // userRepository
  //   .findById(id)
  //   .then((user) => {
  //     console.log(user.name);
  //   })
  //   .catch((error) => console.log(error));
  todoRepository
    .create(name, user)
    .then((todo) => {
      //res.json(todo);

      if (!name) return res.send('Please enter To-do item');
      console.log(todo);
      //res.redirect('/todos');
      res.status(200).json(todo);
    })
    .catch((error) => console.log(error));
});

// delete a todo item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  todoRepository
    .deleteById(id)
    .then((ok) => {
      console.log(ok);
      console.log(`Deleted record with id: ${id}`);

      res.status(200).json({
        message: 'Successfully Deleted',
      });
    })
    .catch((error) => console.log(error));
});

// update a todo item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, done: req.body.done };
  todoRepository
    .updateById(id, todo)
    .then(
      res.status(200).json({
        //redirect: '/todos'
        message: 'Successfully Editted',
      })
    )
    .catch((error) => console.log(error));
});

module.exports = router;
