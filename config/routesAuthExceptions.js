const wildcard = require('wildcard');
const logger = require('../config/logger');

const routes = [
  '/',
  '/contactus',
  '/auth/*',
];

const routesAuthException = async route => new Promise((resolve) => {
  for (let i = 0; i < routes.length; i++) {
    if (wildcard(routes[i], route)) {
      // Logger
      logger.log({
        level: 'info',
        message: `The route ${route} is on the auth routes exceptions list`,
        label: 'AUTH',
      });
      return resolve(true);
    }
  }
  // Logger
  logger.log({
    level: 'info',
    message: `The route ${route} is not on the auth routes exceptions list`,
    label: 'AUTH',
  });
  return resolve(false);
});

module.exports = routesAuthException;
