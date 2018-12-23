const mysql = require('mysql');
const config = require('../config');
const { logger } = require('../logger');


const DatabaseHelper = {};
let currentPool;

DatabaseHelper.debugMode = config.get('DEBUG_MODE');
const databaseConfig = JSON.parse(config.get('DATABASE'));

DatabaseHelper.pool = () => mysql.createPool(databaseConfig);

DatabaseHelper.query = (sql, params, releaseOrDestroy, callback) => {
  if (currentPool) {
    logger.debug('connection reuse');
  } else {
    currentPool = DatabaseHelper.pool();
    logger.debug('creating new connection');
  }
  const pool = currentPool;

  pool.getConnection((err, connection) => {
    if (err) {
      logger.error(err);
      callback(err, null);
      return;
    }

    sql = mysql.format(sql, params);
    if (sql.length < 200) {
      logger.debug(sql);
    }

    connection.query(sql, (conErr, result, fields) => {
      if (releaseOrDestroy == 'release') {
        connection.release();
      } else {
        connection.destroy();
        logger.debug('database connection destroied');
      }
      if (conErr) {
        if (DatabaseHelper.debugMode) {
          logger.error(conErr.sqlMessage);
          callback(conErr.sqlMessage, null);
          return;
        }
        callback(conErr, null);
        return;
      }
      logger.debug(result);
      callback(null, result);
    });
  });
}

module.exports = DatabaseHelper;