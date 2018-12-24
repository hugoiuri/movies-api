const service = require('./auth-service');
const logger = require('../logger');

const controller = (() => {
  const signin = (req, res) => {
    const fbToken = req.body.fbToken;
    service.signin(fbToken, (err, user) => {
      console.log('err: ', err)
      console.log('user: ', user)
      if (err) {
        logger.error('Error to signin - Error: ', err);
        return res.status(400).send(err);
      }
      return res.status(200).send(user);
    })
  };

  return {
    signin
  };
})();

module.exports = controller;
