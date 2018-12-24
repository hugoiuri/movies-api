const controller = require('./auth-controller');

const routes = (router) => {
  router.post('/auth/signin', controller.signin);
};

module.exports = routes;
