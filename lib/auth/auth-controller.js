const service = require('./auth-service');

const controller = (() => {
  const signin = (req, res) => {
    const fbToken = req.body.fbToken;
    service.signin(fbToken, (err, user) => {
      console.log('err: ', err)
      console.log('user: ', user)
      if (err) {
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
