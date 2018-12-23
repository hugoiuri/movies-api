const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { healthStatusRoutes } = require('../health-status');
const config = require('../config');
const pkg = require('../../package.json');
const { logger, requestLogger } = require('../logger');

const server = (() => {
  const router = new express.Router();
  const app = express();
  const env = process.env.NODE_ENV;
  let serverProcess;

  const start = () => new Promise(resolve => {
    healthStatusRoutes(router);

    app.set('port', process.env.PORT | config.get('PORT'));
    app.use(cors());
    app.use(requestLogger);
    app.use(bodyParser.json({
      type: '*/*'
    }));
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use('/', router);

    serverProcess = app.listen(app.get('port'), () => {
      logger.info('------------------------------------------------------------------');
      logger.info(`${pkg.name} - Version: ${pkg.version}`);
      logger.info('------------------------------------------------------------------');
      logger.info(`ATTENTION, ${env} ENVIRONMENT!`);
      logger.info('------------------------------------------------------------------');
      logger.info(`Express server listening on port: ${serverProcess.address().port}`);
      logger.info('------------------------------------------------------------------');

      return resolve(app);
    });
  });

  const stop = () => new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.close(err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
  });

  return {
    start,
    stop
  };
})();

module.exports = server;
