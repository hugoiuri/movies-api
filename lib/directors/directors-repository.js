const database = require('../database');

const repository = (() => {
  const findAll = (callback) => {
    const sql = 'select id, name, photo_url AS photoURL FROM Star WHERE is_director = true';
    const params = null;

    database.query(sql, params, 'release', (err, rows) => {
      return callback(err, rows);
    });
  };

  const findById = (id, callback) => {
    const sql = 'select id, name, photo_url AS photoURL FROM Star WHERE is_director = true AND id = ?';
    const params = [id];

    database.query(sql, params, 'release', (err, rows) => {
      if (rows && rows.length > 0){
        return callback(err, rows[0]);
      }
      return callback(err, null);
    });
  };

  const insert = (actor, callback) => {
    const sql = 'INSERT INTO Star(name, photo_url, is_actor, is_director) VALUES(?,?,?,?)';
    const params = [actor.name, actor.photoURL, false, true];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }
      
      const id = rows.insertId;
      return findById(id, callback);
    });
  };

  const update = (id, actor, callback) => {
    const sql = 'UPDATE Star SET name = ?, photo_url = ? WHERE id = ? AND is_director = true';
    const params = [actor.name, actor.photoURL, id];
  
    database.query(sql, params, 'release', (err) => {
      if (err) {
        return callback(err);
      }
      
      return findById(id, callback);
    });
  };

  const del = (id, callback) => {
    const sql = 'DELETE FROM Star WHERE id = ? AND is_director = true';
    const params = [id];
  
    database.query(sql, params, 'release', (err) => {
      if (err) {
        return callback(err);
      }
      
      return callback();
    });
  };

  return {
    findAll,
    findById,
    insert,
    update,
    del
  };
})();

module.exports = repository;
