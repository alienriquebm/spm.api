const express = require('express');
const logger = require('../config/logger');

express.request.only = function only() {
  const data = {};

  for (let i = 0; i < arguments.length; i += 1) {
    data[arguments[i]] = this.body[arguments[i]]; // eslint-disable-line
  }

  return data;
};

express.response.formValidationError = function formValidationError(errors, status = 403) {
  const stringErrors = [];
  Object.keys(errors).forEach(key => stringErrors.push(`${key}: ${errors[key]}`));
  const message = `Form fields error validation: ${stringErrors}`;
  logger.log({
    level: 'error',
    message,
    label: 'FORM VALIDATION',
  });

  const validationErrorResponse = { validation: errors };
  return this.status(status).json(validationErrorResponse);
};

express.response.error = function handleError(error, status = 403) {
  logger.log({
    level: 'error',
    message: error,
    label: `HTTP ERROR ${status}`,
  });
  return this.status(status).json({ error });
};

express.response.notFoundError = function handleNotFoundError(error = 'Recurso no encontrado') {
  logger.log({
    level: 'error',
    message: error,
    label: 'HTTP ERROR 404',
  });
  return this.status(404).json({ error });
};

express.response.internalError = function handleInternalError(err) {
  logger.log({
    level: 'error',
    message: err,
    label: 'NODE ERROR',
  });

  console.log('\x1b[41m', '=ERROR====', err); // eslint-disable-line
  console.log('\x1b[0m'); // eslint-disable-line
  return this.error('Ocurrió un error', 500);
};
