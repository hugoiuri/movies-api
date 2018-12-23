const repository = require('./actors-repository');

const controller = (() => {
  const getAll = (req, res) => {
    repository.findAll((err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send(result);
    });
  };

  const get = id => {
    return {
      "id": 1,
      "name": "Keanu Reeves",
      "photoURL": "keanu_reeves.jpg"
    }
  };
  const post = () => { };
  const put = id => { };
  const del = id => { };

  return {
    getAll,
    get,
    post,
    put,
    del
  };
})();

module.exports = controller;
