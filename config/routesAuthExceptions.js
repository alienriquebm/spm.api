const logger = require('../config/logger');

const routes = [
  '/',
  '/auth/login',
];

const routesAuthException = async route => new Promise((resolve) => {
  const searchRoute = routes.filter(value => value === route);
  if (searchRoute.length) {
    // Logger
    logger.log({
      level: 'info',
      message: `The route ${route} is on the auth routes exceptions list`,
      label: 'AUTH',
    });
    resolve(true);
  } else {
    // Logger
    logger.log({
      level: 'info',
      message: `The route ${route} is not on the auth routes exceptions list`,
      label: 'AUTH',
    });
    resolve(false);
  }
});

module.exports = routesAuthException;
