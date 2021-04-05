const express = require('express');


//const app = express.Router();
const app = express();
const repository = require('../repositories/TodoRepository');

//set view engine to ejs
app.set("view engine", "ejs");

app.use(express.json());


// get all todo items in the db
app.get('/', (req, res) => {
  const mascots = [];
  repository.findAll().then((todos) => {
    console.log(res.json(todos));
    
    mascots = res.json(todos);
//   const tagline = "Click to add to your TO-DO list";


  }).catch((error) => console.log(error));
  res.render("pages/index",{
    mascots: mascots,
     //tagline: tagline,
   });
});

// add a todo item
app.post('/', (req, res) => {
  const { name } = req.body;
  repository.create(name).then((todo) => {
    res.json(todo);
  }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    res.status(200).json([]);
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, done: req.body.done };
  repository.updateById(id, todo)
    .then(res.status(200).json([]))
    .catch((error) => console.log(error));
});
module.exports = app;