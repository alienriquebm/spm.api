const jwt = require('jsonwebtoken');
const routesAuthExceptions = require('../config/routesAuthExceptions');
const logger = require('../config/logger');

const checkToken = async (req, res, next) => {
  // Logger
  logger.log({
    level: 'info',
    message: `Route attempt: ${req.path}`,
    label: 'AUTH',
  });

  const checkPath = await (routesAuthExceptions(req.path));
  if (!checkPath) {
    return res.error('NOT AUTHORIZED', 403);
  }
  return next();
};

module.exports = checkToken;
