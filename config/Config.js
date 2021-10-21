//config/Config.js
require('dotenv').config();
module.exports = {
  DB: process.env.MONGO_URL
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017/todos',
  //APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : 80,
  //APP_PORT: process.env.APP_PORT ? process.env.APP_PORT : process.env.PORT,
  APP_PORT: process.env.PORT ? process.env.PORT : process.env.APP_PORT,
  TODO_JWTPRIVATEKEY: process.env.TODO_JWTPRIVATEKEY,
};
