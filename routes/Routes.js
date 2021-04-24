if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initialisePassport = require('../config/passport-config');
initialisePassport(
  passport, 
  email =>{
    return users.find(user=> user.email ===email)
  },
  id =>{
    return users.find(user=>user.id ===id)
  }
)

const users =[];
//const app = express.Router();
const app = express();


const repository = require('../repositories/TodoRepository');
const userRepository = require('../repositories/UserRepository');
//const passport = require('passport');

//set view engine to ejs
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// app.use(function(req,res,next){
//   if (req.query._method === 'DELETE'){
//     req.method = 'DELETE';
//     req.url = req.path;
//   }
//   next();
// });

app.get('/',checkAuthenticated,(req,res)=>{
  
});


// get all todo items in the db
app.get('/', checkAuthenticated, (req, res) => {
  repository.findAll().then((todos) => {
    
    //res.json(todos);
    
    res.render("pages/index",{
      mascots: todos,
      name: req.user.name
      //tagline: tagline,
    });
  console.log(todos);

  }).catch((error) => console.log(error));
  
});

// get login page
app.get('/login', checkNotAuthenticated, (req, res) => {
        
    res.render("pages/login",{

    });

  
});

// get login page
app.post('/login',  passport.authenticate('local',{
  successRedirect: '/todos',
  failureRedirect:'login',
  failureFlash: true
}));

// get register page
app.get('/register', checkNotAuthenticated ,(req, res) => {
        
    res.render("pages/register",{

    });
});

app.post('/register',async (req,res)=>{
  try{
    const hashedPassword =  await bcrypt.hash(req.body.password,10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    // userRepository.create(
    //   JSON.stringify({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    //   })
    // ).then((user)=>{
    //   console.log(user);
    // });
    console.log(req.body.name)
    res.redirect('login')
  }catch{
    res.redirect('/register')
  }
  console.log(users);
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

app.get('/logout',(req,res)=>{
  req.logOut();
  //console.log("I'm here");
  //req.session.destroy(err=>{})
  res.redirect('login');
});

function checkAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return next()
  }

  res.redirect('todos/login');
}

function checkNotAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    return res.redirect('/todos');
  }

  next();
}
module.exports = app;