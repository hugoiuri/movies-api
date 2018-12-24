const database = require('../database');
const actorsRepository = require('../actors/actors-repository');

const repository = (() => {
  const findAll = (callback) => {
    const sql = 'select id, title, photo_url AS photoURL, released_date AS releasedAt, lenght FROM Movie';
    const params = null;

    database.query(sql, params, 'release', (err, rows) => {
      return callback(err, rows);
    });
  };

  const findById = (id, callback) => {
    const sql = 'select id, title, photo_url AS photoURL, released_date AS releasedAt, lenght FROM Movie WHERE id = ?';
    const params = [id];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      if (rows && rows.length > 0) {
        const movie = rows[0];
        actorsRepository.findByModieId(id, (Aerr, actors) => {
          movie.actors = actors;
          return callback(Aerr, movie);
        });
      }
    });
  };

  const insert = (movie, callback) => {
    const sql = 'INSERT INTO Star(title, photo_url, released_date, lenght) VALUES(?,?,?,?)';
    const params = [movie.title, movie.photoURL, movie.releasedAt, movie.lenght];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }

      const id = rows.insertId;
      return findById(id, callback);
    });
  };

  const update = (id, actor, callback) => {
    const sql = 'UPDATE Star SET name = ?, photo_url = ? WHERE id = ? AND is_actor = true';
    const params = [actor.name, actor.photoURL, id];

    database.query(sql, params, 'release', (err) => {
      if (err) {
        return callback(err);
      }

      return findById(id, callback);
    });
  };

  const del = (id, callback) => {
    const sql = 'DELETE FROM Star WHERE id = ? AND is_actor = true';
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
