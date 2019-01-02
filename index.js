require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors'); // eslint-disable-line
const express = require('express');
const config = require('./config/server');
const routes = require('./config/routes');
const logger = require('./config/logger');
const jwt = require('./middlewares/jwt');

require('./config/express');

logger.log({ level: 'info', message: 'Starting the app...', label: 'STARTUP' });

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

app.use(jwt);
app.use(routes);

app.listen(config.port, () => {
  console.log(`API server up, listening port: ${config.port}`); // eslint-disable-line
});
