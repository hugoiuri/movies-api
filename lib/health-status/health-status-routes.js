const healthStatusController = require('./health-status-controller');

const routes = (router) => {
  router.get('/health-status', healthStatusController.get);
};

module.exports = routes;
