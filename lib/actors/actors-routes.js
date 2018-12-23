const controller = require('./actors-controller');

const routes = (router) => {
  router.get('/actors', controller.getAll);
};

module.exports = routes;
