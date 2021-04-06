
///////////////////////////////////////////
//app.js

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const config = require('./config/Config');

const routes = require('./routes/Routes');

const app = express();

require("dotenv").config();


 const port = config.APP_PORT;

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());  //enable cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', routes);





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

//////////////////////////////////////////////////////////////////////////

//require("dotenv").config();

//const express = require("express");
//const app = express();

//set view engine to ejs
//app.set("view engine", "ejs");

//app.use(express.json());


//const port = config.APP_PORT;


//Middlewares
// app.use("/", ()=>{
//   next();
// });

//use res.render to load up an ejs view file

//index page
// app.get("/",(req,res)=>{
//   //res.send("Click to find your TO-DO list");
//   const mascots =[];
//   const tagline = "Click to add to your TO-DO list";
//   res.render("pages/index",{
//     mascots: mascots,
//     //tagline: tagline,
//   });
  
// });

// app.get("/api/to-do", (req, res) => {
//   const mascots = [
//     { id: 1, name: "DigitalOcean", description: 2012 },
//     { id: 2, name: "Linux", description: 1996 },
//     { id: 3, name: "Docker", description: 2013 },
//   ];
//   const tagline = "Click to add to your TO-DO list";


//   res.render("pages/index", {
//     mascots: mascots,
//     //tagline: tagline,
//   });
// });

// //Add to-do
// app.post("/api/to-do",(req,res)=>{
  
//   res.status(201).json({
//     status: "success",
//     data:[
//       { id: 1, name: "DigitalOcean", description: 2012 }
//     ],
//   });
  
//   res.render("pages/index",{
    
//   });
// });

// //Delete to-do item
// app.delete("/api/to-do/:id",(req,res)=>{
  
// });

// //Change to-do item
// app.put("/api/to-do/:id",(req,res)=>{
  
// });

// //about page
// app.get("/about", (req, res) => {
//   res.render("pages/about");
// });



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });

//console.log("This is your ENV "+ process.env.APP_PORT);