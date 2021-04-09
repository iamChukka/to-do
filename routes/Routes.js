const express = require('express');
const bcrypt = require('bcrypt');
const users =[];
//const app = express.Router();
const app = express();
const repository = require('../repositories/TodoRepository');

//set view engine to ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// get all todo items in the db
app.get('/',  (req, res) => {
  repository.findAll().then((todos) => {
    
    //res.json(todos);
    
    res.render("pages/index",{
      mascots: todos,
      //tagline: tagline,
    });
  console.log(todos);

  }).catch((error) => console.log(error));
  
});

// get login page
app.get('/login',  (req, res) => {
        
    res.render("pages/login",{

    });

  
});

// get register page
app.get('/register',  (req, res) => {
        
    res.render("pages/register",{

    });
});

app.post('/register',async (req,res)=>{
  try{const hashedPassword =  await bcrypt.hash(req.body.password,10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('login')
  }catch{
    res.redirect('/register')
  }
  console.log(users);
});

// get login page
app.get('/register',  (req, res) => {
        
  res.render("pages/login",{

  });
});


// add a todo item
app.post('/', (req, res) => {
  const { name } = req.body;
  //console.log(name);
  repository.create(name).then((todo) => {
    //res.json(todo);

    if (!name) 
    return  res.send ("Please enter To-do item");
    
    res.redirect('/todos');


  }).catch((error) => console.log(error));
});

// delete a todo item
app.delete('/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    console.log(ok);
    console.log(`Deleted record with id: ${id}`);
    
    res.status(200).json({
      //redirect: '/todos'
    });
    
  }).catch((error) => console.log(error));
});

// update a todo item
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = { name: req.body.name, done: req.body.done };
  repository.updateById(id, todo)
    .then(res.status(200).json({
      //redirect: '/todos'
    }))
    .catch((error) => console.log(error));
});
module.exports = app;