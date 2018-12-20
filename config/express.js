const express = require('express');

express.response.error = function handleError(error, status = 403) {
  return this.status(status).json({ error });
};

express.response.notFoundError = function handleNotFoundError(error) {
  return this.status(404).json({ error });
};

express.response.internalError = function handleInternalError(err) {
  console.log('\x1b[41m', '=ERROR====', err); // eslint-disable-line
  console.log('\x1b[0m'); // eslint-disable-line
  return this.error('Ocurrió un error', 500);
};
