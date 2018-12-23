const morgan = require('morgan');
const logger = require('./logger')

morgan.token('reqbody', (req) => JSON.stringify(req.body));

const options = {
  stream: {
    write: logger.info
  }
}

module.exports = morgan(':method :url :reqbody - :status', options);
