const controller = require('./users-controller');

const routes = (router) => {
  router.get('/user/:id/statistic', controller.statistic);
  
  router.get('/user/:id/list', controller.validateAuth, controller.getList);

  router.post('/user/:id/list', controller.validateAuth, controller.postList);

  router.delete('/user/:id/list/:movieId', controller.validateAuth, controller.delList);
};

module.exports = routes;
