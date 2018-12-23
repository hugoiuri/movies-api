const database = require('../database');

const repository = (() => {
  const findAll = (callback) => {
    var sql = 'select id, name, photo_url AS photoURL FROM Star WHERE is_actor = true';
    var params = null;

    database.query(sql, params, 'release', (err, rows) => {
      if (err){
        return callback(err);
      }
      if (!rows || rows.length == 0) {
        return callback();
      }

      return callback(null, rows);
    });
  };

  return {
    findAll
  };
})();

module.exports = repository;
