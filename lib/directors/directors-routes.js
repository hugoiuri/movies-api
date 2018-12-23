const controller = require('./directors-controller');

const routes = (router) => {
  router.get('/directors', controller.getAll);
  
  router.get('/directors/:id', controller.get);

  router.post('/directors', controller.post);

  router.put('/directors/:id', controller.put);

  router.delete('/directors/:id', controller.del);
};

module.exports = routes;
