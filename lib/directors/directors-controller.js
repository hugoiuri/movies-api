require('../util/string-extension');

const repository = require('./directors-repository');
const logger = require('../logger');

const controller = (() => {
  const getAll = (req, res) => {
    repository.findAll((err, result) => {
      if (err) {
        logger.error(`Error to get directors - Error: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
      if (result && result.length > 0) {
        return res.status(200).send(result);
      }
      return res.status(404).send('Not Found');
    });
  };

  const get = (req, res) => {
    const id = req.params["id"];
    repository.findById(id, (err, result) => {
      if (err) {
        logger.error(`Error to get directors - ID: ${id} - Error: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
      if (result) {
        return res.status(200).send(result);
      }
      return res.status(404).send('Not Found');
    });
  };

  const post = (req, res) => {
    const director = req.body;
    director.photoURL = req.body.name.fileNameClean('.jpg');

    repository.insert(director, (err, result) => {
      if (err) {
        logger.error(`Error to create directors - director: ${director.name} - Error: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send(result);
    });
  };

  const put = (req, res) => {
    const id = req.params["id"];
    const director = req.body;
    director.photoURL = req.body.name.fileNameClean('.jpg');

    repository.update(id, director, (err, result) => {
      if (err) {
        logger.error(`Error to update directors - ID: ${id} - Error: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send(result);
    });
  };

  const del = (req, res) => {
    const id = req.params["id"];

    repository.del(id, (err, result) => {
      if (err) {
        logger.error(`Error to delete directors - ID: ${id} - Error: ${err}`);
        return res.status(500).send('Internal Server Error');
      }
      return res.status(204).send(`Director ${id} deleted`);
    });
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
