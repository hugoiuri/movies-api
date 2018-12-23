const config = require('../config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf, prettyPrint } = format;

const logFormat = printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const logger = createLogger({
  level: config.get('LOG_LEVEL') || 'info',
  format: combine(
    timestamp(),
    colorize(),
    prettyPrint(),
    logFormat
  ),
  transports: [new transports.Console()],
  exitOnError: false
});

module.exports = logger;
