require('../util/string-extension');

const repository = require('./actors-repository');

const controller = (() => {
  const getAll = (req, res) => {
    repository.findAll((err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      if (result && result.length > 0) {
        return res.status(200).send(result);
      }
      return res.status(404).send('Not Found');
    });
  };

  const get = (req, res) => {
    const id = req.params["id"]
    repository.findById(id, (err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send('Not Found');
    });
  };

  const post = (req, res) => {
    const actor = req.body;
    actor.photoURL = req.body.name.fileNameClean('.jpg');

    repository.insert(actor, (err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send(result);
    });
  };

  const put = (req, res) => {

  };

  const del = (req, res) => {

  };

  return {
    getAll,
    get,
    post,
    put,
    del
  };
})();

module.exports = controller;
