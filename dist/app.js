"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////////////////////
//app.ts
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config;
}
// const createError = require("http-errors");
const express_1 = __importDefault(require("express"));
const path = require("path");
const mongoose_1 = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const initialisePassport = require("./config/passport-config");
// const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
// const userRepository = require("./controllers/userControllers");
//const authenticated = require("./middleware/authenticate");
const config = require("./config/Config");
const todos = require("./routes/Todos");
const users = require("./routes/Users");
const auth = require("./routes/Auth");
const app = (0, express_1.default)();
// const checkAuthenticated = authenticated.checkAuthenticated;
// const checkNotAuthenticated = authenticated.checkNotAuthenticated;
//require("dotenv").config();
//set view engine to ejs
app.set("view engine", "ejs");
const port = config.APP_PORT;
if (!config.TODO_JWTPRIVATEKEY) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}
(0, mongoose_1.connect)(config.DB);
app.use(cors()); //enable cors
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express_1.default.static(path.join(__dirname, "public")));
//getUsers();
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/todos", todos);
//console.log(users);
app.get("/", (req, res) => {
    res.send("Welcome to the Front");
});
// Listen on port defined in environment
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
module.exports = app;
