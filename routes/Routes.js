const express = require('express');

//const app = express.Router();
const app = express();

//set view engine to ejs
app.set('view engine', 'ejs');

const repository = require('../repositories/TodoRepository');
const userRepository = require('../repositories/UserRepository');

const authenticated = require('../authenticate');

const checkAuthenticated = authenticated.checkAuthenticated;
const checkNotAuthenticated = authenticated.checkNotAuthenticated;

// get all todo items in the db
app.get('/', checkAuthenticated, (req, res) => {
  try {
    const { _id, name } = req.user;
    //console.log(_id, name);
    repository.findAll().then((todos) => {
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
      res.render('pages/index', {
        mascots: userTodo,
        //name: req.user.name
        //tagline: tagline,
      });
    });
  } catch (e) {
    console.log('Errors everyday');
  }
});

// add a todo item
app.post('/', (req, res) => {
  const user = req.user;
  const { name } = req.body;
  //console.log(id);
  // userRepository
  //   .findById(id)
  //   .then((user) => {
  //     console.log(user.name);
  //   })
  //   .catch((error) => console.log(error));
  repository
    .create(name, user)
    .then((todo) => {
      //res.json(todo);

      if (!name) return res.send('Please enter To-do item');
      console.log(todo);
      res.redirect('/todos');
    })
    .catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository
    .deleteById(id)
    .then((ok) => {
      console.log(ok);
      console.log(`Deleted record with id: ${id}`);

      res.status(200).json({
        //redirect: '/todos'
      });
    })
    .catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, done: req.body.done };
  repository
    .updateById(id, todo)
    .then(
      res.status(200).json({
        //redirect: '/todos'
      })
    )
    .catch((error) => console.log(error));
});

module.exports = app;
