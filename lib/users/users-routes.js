const controller = require('./users-controller');

const routes = (router) => {
  router.get('/user/:id/statistic', controller.statistic);
  
  router.get('/user/:id/list', controller.getList);

  router.post('/user/:id/list', controller.postList);

  router.delete('/user/:id/list/:movieId', controller.delList);
};

module.exports = routes;
