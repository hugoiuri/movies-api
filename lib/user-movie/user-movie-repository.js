const database = require('../database');

const repository = (() => {
  const findById = (id, callback) => {
    const sql = 'SELECT id, toWatch, watched, favorite, review, user_id, movie_id FROM UserMovie WHERE id = ?';
    const params = [id]

    database.query(sql, params, 'release', callback);
  };

  const findByUserId = (id, callback) => {
    const sql = 'SELECT id, toWatch, watched, favorite, review, user_id, movie_id FROM UserMovie WHERE user_id = ?';
    const params = [id]

    database.query(sql, params, 'release', callback);
  };

  const findByMovieId = (id, movieId, callback) => {
    const sql = 'SELECT id, toWatch, watched, favorite, review, user_id, movie_id FROM UserMovie WHERE user_id = ? AND movie_id = ?';
    const params = [id, movieId]

    database.query(sql, params, 'release', callback);
  };

  const findMoviesStatistics = (id, callback) => {
    const sql = `SELECT UserMovie.user_id, UserMovie.movie_id, Movie.length
                FROM UserMovie INNER JOIN Movie
                ON UserMovie.user_id = Movie.id
                WHERE watched = 1
                AND user_id = ?`;

    const params = [id]

    database.query(sql, params, 'release', callback);
  };

  const insert = (item, callback) => {
    const sql = 'INSERT INTO UserMovie(toWatch, watched, favorite, review, user_id, movie_id) VALUES(?,?,?,?,?,?)';
    const params = [item.toWatch, item.watched, item.favorite, item.review, item.user_id, item.movie_id];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }

      const id = rows.insertId;
      return findById(id, callback);
    });
  };

  const update = (id, item, callback) => {
    const sql = 'UPDATE UserMovie SET toWatch = ?, watched = ?, favorite = ?, review = ?, user_id = ?, movie_id = ? WHERE id = ?';
    const params = [item.toWatch, item.watched, item.favorite, item.review, item.user_id, item.movie_id, id];

    database.query(sql, params, 'release', (err, rows) => {
      if (err) {
        return callback(err);
      }

      return findById(id, callback);
    });
  }

  const del = (id, movieId, callback) => {
    const sql = 'DELETE FROM UserMovie WHERE user_id = ? AND movie_id = ?';
    const params = [id, movieId];

    database.query(sql, params, 'release', (err) => {
      if (err) {
        return callback(err);
      }
      
      return callback();
    });
  };

  return {
    findById,
    findByUserId,
    findByMovieId,
    findMoviesStatistics,
    insert,
    update,
    del
  }
})();

module.exports = repository;
