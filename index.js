require('dotenv').config();
const bodyParser = require('body-parser');
const colors = require('colors');
const express = require('express');

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


app.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

app.listen(process.env.SRV_PORT);
console.log(colors.underline(`Listen port ${process.env.SRV_PORT}`)); // eslint-disable-line
