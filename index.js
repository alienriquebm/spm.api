require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors'); // eslint-disable-line
const express = require('express');
const https = require('https');
const fs = require('fs');
const config = require('./config/server');
const routes = require('./config/routes');
const logger = require('./config/logger');
const jwt = require('./middlewares/jwt');
require('./config/express');

logger.log({ level: 'info', message: 'Starting the app...', label: 'STARTUP' });

const app = express();

let secureServer;
const enableHttps = process.env.HTTPS_ENABLED || false;
if (enableHttps) {
  secureServer = https.createServer({
    key: fs.readFileSync(process.env.HTTPS_KEY_FILE_PATH || './key.pem'),
    cert: fs.readFileSync(process.env.HTTPS_CERT_FILE_PATH || './cert.pem'),
    ca: fs.readFileSync(process.env.HTTPS_CA_FILE_PATH || './chain.pem'),
  }, app);
}
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

if (enableHttps) {
  secureServer.listen(config.securePort, () => {
    console.log(`API server up, listening SECURE port: ${config.securePort}`); // eslint-disable-line
  });
} else {
  app.listen(config.port, () => {
    console.log(`API server up, listening port: ${config.port}`); // eslint-disable-line
  });
}
