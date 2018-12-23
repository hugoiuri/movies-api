const database = require('../database');

const repository = (() => {
  const findAll = (callback) => {
    const sql = 'select id, name, photo_url AS photoURL FROM Star WHERE is_actor = true';
    const params = null;

    database.query(sql, params, 'release', (err, rows) => {
      return callback(err, rows);
    });
  };

  const findById = (id, callback) => {
    const sql = 'select id, name, photo_url AS photoURL FROM Star WHERE is_actor = true AND id = ?';
    const params = [id];

    database.query(sql, params, 'release', (err, rows) => {
      console.log(rows)
      if (rows && rows.length > 0){
        return callback(err, rows[0]);
      }
      return callback(err, null);
    });
  };

  const insert = (actor, callback) => {
    const sql = 'INSERT INTO Star(name, photo_url, is_actor, is_director) VALUES(?,?,?,?)';
    const params = [actor.name, actor.photoURL, true, false];

    database.query(sql, params, 'release', function(err, rows) {
      console.log(err)
      if (err) {
        return callback(err);
      }
      
      const id = rows.insertId;
      return findById(id, callback);
    });
  };

  return {
    findAll,
    findById,
    insert
  };
})();

module.exports = repository;
