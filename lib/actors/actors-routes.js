const controller = require('./actors-controller');

const routes = (router) => {
  router.get('/actors', controller.getAll);
  
  router.get('/actors/:id', controller.get);

  router.post('/actors', controller.post);
};

module.exports = routes;
