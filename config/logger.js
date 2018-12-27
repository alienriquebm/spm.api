const { createLogger, format, transports } = require('winston');
const moment = require('moment');

const { printf } = format;


const logFormat = printf((info) => {
  const parsedInfo = info;
  parsedInfo.timestamp = moment.tz(new Date(), process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
  if (!info.label) {
    parsedInfo.label = 'GENERAL';
  }
  return `${parsedInfo.timestamp} [${parsedInfo.label}] ${parsedInfo.level.toUpperCase()}: ${parsedInfo.message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: logFormat,
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: process.env.MAX_SIZE_LOG,
      maxFiles: process.env.MAX_FILES,
    }),
    new transports.File({
      filename: 'logs/spm.log',
      maxsize: process.env.MAX_SIZE_LOG,
      maxFiles: process.env.MAX_FILES,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.colorize(),
    silent: true,
  }));
}

module.exports = logger;
