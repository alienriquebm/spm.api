const express = require('express');

express.request.only = function only() {
  const data = {};

  for (let i = 0; i < arguments.length; i += 1) {
    data[arguments[i]] = this.body[arguments[i]]; // eslint-disable-line
  }

  return data;
};

express.response.returnValidationError = function returnValidationError(errors, status = 403) {
  const validationErrorResponse = { validation: errors };
  return this.status(status).json(validationErrorResponse);
};

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
