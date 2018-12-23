const controller = require('./health-status-controller');

const routes = (router) => {
  router.get('/health-status', controller.get);
};

module.exports = routes;
