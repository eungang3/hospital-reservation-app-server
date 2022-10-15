require('dotenv').config();
const express = require('express');
require('express-async-errors');
const router = require('./routes/index');
const morgan = require('morgan');
const cors = require('cors');
const myDataSource = require('./models/db.config');
const errorHandler = require('./middlewares/errorHandler');

myDataSource
  .initialize()
  .then(() => {
    console.log('DB connect');
  })
  .catch((err) => {
    console.log(err);
  });

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(router);
  // 에러 처리 미들웨어
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };
