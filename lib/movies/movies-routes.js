const controller = require('./movies-controller');

const routes = (router) => {
  router.get('/movies', controller.getAll);
  
  router.get('/movies/:id', controller.get);

  router.post('/movies', controller.post);

  router.put('/movies/:id', controller.put);

  router.delete('/movies/:id', controller.del);
};

module.exports = routes;
