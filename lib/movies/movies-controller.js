require('../util/string-extension');

const repository = require('./movies-repository');

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
    const id = req.params["id"];
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
    const movie = req.body;
    movie.photoURL = req.body.title.fileNameClean('.jpg');

    repository.insert(movie, (err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send(result);
    });
  };

  const put = (req, res) => {
    const id = req.params["id"];
    const movie = req.body;
    movie.photoURL = req.body.title.fileNameClean('.jpg');

    repository.update(id, movie, (err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.status(200).send(result);
    });
  };

  const del = (req, res) => {
    const id = req.params["id"];

    repository.del(id, (err, result) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.status(204).send(`Movie ${id} deleted`);
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
