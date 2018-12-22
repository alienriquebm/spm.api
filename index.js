require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors');
const express = require('express');
const config = require('./config/server');
const routes = require('./config/routes');
const logger = require('./config/logger');

require('./config/express');

logger.log({ level: 'info', message: 'Starting the app...', label: 'STARTUP' });

const app = express();

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

logger.log({ level: 'info', message: 'Setting cors...', label: 'STARTUP' });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

logger.log({ level: 'info', message: 'Setting routes...', label: 'STARTUP' });
app.use(routes);

logger.log({ level: 'info', message: 'Setting port...', label: 'STARTUP' });
app.listen(config.port);
logger.log({ level: 'info', message: `API server up, listening port: ${config.port}`, label: 'STARTUP' });
console.log(colors.underline(`API server up, listening port: ${config.port}`)); // eslint-disable-line