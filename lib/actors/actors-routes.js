const controller = require('./actors-controller');

const routes = (router) => {
  router.get('/actors', controller.getAll);
  
  router.get('/actors/:id', controller.get);

  router.post('/actors', controller.post);

  router.put('/actors/:id', controller.put);

  router.delete('/actors/:id', controller.del);
};

module.exports = routes;
