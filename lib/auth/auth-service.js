const request = require("request");
const userRepository = require("../users/users-repository");

const service = (() => {
  const signin = (fbToken, callback) => {
    const url = `https://graph.facebook.com/me?access_token=${fbToken}&fields=name,email,id,picture`;
    const options = {
      url: url,
      method: 'GET',
      encoding: null,
      contentType: 'application/json'
    }

    request(options, (error, resp, body) => {
      if (error) {
        return callback(error);
      }
      if (resp.statusCode != 200) {
        return callback({ 'message': 'Não foi possível autenticar pelo Facebook.' });
      }

      const userFacebook = JSON.parse(body);

      userRepository.findByEmail(userFacebook.email, (fErr, user) => {
        if (fErr) {
          return callback(error);
        }
        if (!user) {
          userRepository.insert(fbToken, userFacebook, callback);
        } else {
          userRepository.edit(user.id, fbToken, userFacebook, callback);
        }
      });
    });
  };


  return {
    signin
  }
})();

module.exports = service;
