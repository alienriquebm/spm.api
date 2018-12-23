const jwt = require('jsonwebtoken');
const routesAuthExceptions = require('../config/routesAuthExceptions');
const logger = require('../config/logger');
const User = require('../models/User');

const checkToken = async (req, res, next) => {
  // Logger
  logger.log({
    level: 'info',
    message: `Route attempt: ${req.path}`,
    label: 'AUTH',
  });

  // Check if the path is on routes exception list
  const checkPath = await (routesAuthExceptions(req.path));
  if (checkPath) {
    return next();
  }

  // Check if token exists
  let token = req.headers.authorization || req.query.token;
  if (!token) {
    return res.error('TOKEN NOT PROVIDED', 403);
  }
  token = token.split(' ');
  token = token.length > 1 ? token[1] : token[0];
  jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
    if (err) {
      return res.error('TOKEN INVALID', 403);
    }

    const instance = await User.findOne({
      where: {
        id: decoded.id,
      },
      attributes: ['isEnabled'],
    });

    if (instance && instance.isEnabled) {
      // Logger
      logger.log({
        level: 'info',
        message: `Route ${req.path} access granted to user: ${decoded.user}`,
        label: 'AUTH',
      });
      return next();
    }
    return res.error('Usuario inactivo', 403);
  });

  return undefined;
};

module.exports = checkToken;
