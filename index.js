require('dotenv').config();
const colors = require('colors');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(process.env.SRV_PORT);
console.log(colors.green(`Listen port ${process.env.SRV_PORT}`)); // eslint-disable-line
