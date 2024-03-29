///////////////////////////////////////////
//app.ts
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config;
}
import express, { Request, Response } from "express";
import { connect } from "mongoose";
import config from "./config/Config";
import todos from "./routes/Todos";
import users from "./routes/Users";
import auth from "./routes/Auth";

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const port = config.APP_PORT;

if (!config.TODO_JWTPRIVATEKEY) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

connect(config.DB);

app.use(cors()); //enable cors

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/todos", todos);

//console.log(users);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Front");
});

// Listen on port defined in environment
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

module.exports = app;
