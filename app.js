///////////////////////////////////////////
//app.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config;
}

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const userRepository = require('./repositories/UserRepository');
const authenticated = require('./authenticate');
const config = require('./config/Config');
const routes = require('./routes/Routes');

const users = [];
const app = express();

const checkAuthenticated = authenticated.checkAuthenticated;
const checkNotAuthenticated = authenticated.checkNotAuthenticated;

//require("dotenv").config();

//set view engine to ejs
app.set('view engine', 'ejs');

const port = config.APP_PORT;

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors()); //enable cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/todos', routes);

const initialisePassport = require('./config/passport-config');
initialisePassport(
  passport,
  (email) => {
    return users.find((user) => user.email === email);
  },
  (id) => {
    return users.find((user) => user.id === id);
  }
);

app.get('/', (req, res) => {
  res.redirect('/login');
});

// get login page
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('pages/login', {});
});

// login to TODOS page
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

// get register page
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('pages/register', {});
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    // userRepository.create(
    //   JSON.stringify({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: hashedPassword
    //   })
    // ).then((user)=>{
    //   console.log(user);
    // });
    console.log(req.body.name);
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
  console.log(users);
});

app.get('/logout', (req, res) => {
  req.logOut();
  //console.log("I'm here");
  //req.session.destroy(err=>{})
  res.redirect('login');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(config.APP_PORT); // Listen on port defined in environment
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
