const { logger } = require('../logger');
const service = require('./users-service');

const controller = (() => {
  const statistic = (req, res) => {
    const id = req.params['id'];
    
    service.statistic(id, (err, data) => {
      if (err) {
        logger.error(`Error to get statistcs - Error: ${err}`);
        return res.status(400).send(err);
      }
      return res.status(200).send(data);
    });
  };

  const getList = (req, res) => {
    const id = req.params['id'];
    
    service.getList(id, (err, data) => {
      if (err) {
        logger.error(`Error to get list - Error: ${err}`);
        return res.status(400).send(err);
      }
      return res.status(200).send(data);
    });
  };

  const postList = (req, res) => {
    const id = req.params['id'];
    const body = req.body;
    
    service.postList(id, body, (err, data) => {
      if (err) {
        logger.error(`Error to post list - Error: ${err}`);
        return res.status(400).send(err);
      }
      return res.status(200).send(data);
    });
  };

  const delList = (req, res) => {
    const id = req.params['id'];
    const movieId = req.params['movieId'];
    
    service.delList(id, movieId, (err) => {
      if (err) {
        logger.error(`Error to delete list - Error: ${err}`);
        return res.status(400).send(err);
      }
      return res.status(204).send();
    });
  };

  return {
    statistic,
    getList,
    postList,
    delList
  }
})();

module.exports = controller;
