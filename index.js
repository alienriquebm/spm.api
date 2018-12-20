require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors');
const express = require('express');
const config = require('./config/server');
const routes = require('./config/routes');
require('./config/express');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

app.use(routes);

app.listen(config.port);
console.log(colors.underline(`API server up, listening port: ${config.port}`)); // eslint-disable-line