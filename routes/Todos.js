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

// get all todo items in the db
// router.get('/', /*checkAuthenticated,*/ auth, (req, res) => {
//   try {
//     todoRepository.find({ userId: req.user._id }).then((todos) => {
//       console.log(todos);
//       return res.send(todos);
//     });

//     // todoRepository.findAll().then((todos) => {
//     //   let userTodo = [];
//     //   for (let i = 0; i < todos.length; i++) {
//     //     if (req.user.id == todos[i].user.id) {
//     //       userTodo.push(todos[i]);
//     //     }

//     //   }

//     //   return res.json(userTodo);
//     // });
//   } catch (e) {
//     console.log('Errors everyday');
//   }
// });

// add a todo item
router.post('/', auth, todoControllers.createTodo);

//get all items User added
router.get('/', auth, todoControllers.getTodosByUserId);

// // delete a todo item
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
//   todoRepository
//     .deleteById(id)
//     .then((ok) => {
//       console.log(ok);
//       console.log(`Deleted record with id: ${id}`);

//       res.status(200).json({
//         message: 'Successfully Deleted',
//       });
//     })
//     .catch((error) => console.log(error));
// });

// // update a todo item
// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const todo = { name: req.body.name, done: req.body.done };
//   todoRepository
//     .updateById(id, todo)
//     .then(
//       res.status(200).json({
//         //redirect: '/todos'
//         message: 'Successfully Editted',
//       })
//     )
//     .catch((error) => console.log(error));
// });

module.exports = router;
