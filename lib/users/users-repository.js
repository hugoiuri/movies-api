const database = require('../database');

const repository = (() => {
  const find = (callback) => {

  }

  const findById = (id, callback) => {
    const sql = 'SELECT id, name, email, fbToken, photo_url AS photoURL FROM User WHERE id = ?';
    const params = [id];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }
      if (!rows || rows.length == 0) {
        return callback();
      }
      return callback(null, rows[0]);
    });
  };

  const findByEmail = (email, callback) => {
    const sql = 'SELECT id, name, email, fbToken, photo_url FROM User WHERE email = ?';
    const params = [email];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }
      if (!rows || rows.length == 0) {
        return callback();
      }
      return callback(null, rows[0])
    });
  };

  const insert = (fbToken, user, callback) => {
    const sql = 'INSERT INTO User (name, fbToken, photo_url, email) VALUES (?,?,?,?)';
    const params = [user.name, fbToken, user.name, user.email];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }
      findById(rows.insertId, callback);
    });
  };

  const edit = (id, fbToken, user, callback) => {
    const sql = 'UPDATE User SET name = ?, fbToken = ?, photo_url = ? WHERE email = ?';
    const params = [user.name, fbToken, user.name, user.email];

    database.query(sql, params, 'release', (err) => {
      if (err) {
        return callback(err);
      }
      findById(id, callback);
    });
  };

  return {
    find,
    findById,
    findByEmail,
    insert,
    edit
  }
})();

module.exports = repository;
