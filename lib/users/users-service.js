const userMovieRepository = require('../user-movie/user-movie-repository');

const service = (() => {
  const statistic = (id, callback) => {
    userMovieRepository.findMoviesStatistics(id, (err, resp) => {
      if (err) {
        return callback(err);
      }

      const length = resp.reduce((acc, cur) => acc + cur.length, 0);
      const data = {
        "id": id,
        "length": length
      }

      return callback(null, data);
    })
  };

  const getList = (id, callback) => {
    userMovieRepository.findByUserId(id, (err, resp) => {
      if (err) {
        return callback(err);
      }

      const data = {
        id,
        watched: resp.filter(value => value.watched === 1).map(item => item.movie_id),
        toWatch: resp.filter(value => value.toWatch === 1).map(item => item.movie_id),
        favorite: resp.filter(value => value.favorite === 1).map(item => item.movie_id)
      }
      return callback(null, data);
    });
  };

  const postList = (id, data, callback) => {
    userMovieRepository.findByMovieId(id, data.movieId, (err, resp) => {
      if (err) {
        return callback(err);
      }
      if (!resp || resp.length == 0) {
        const item = {
          toWatch: data.list === 'toWatch' ? 1 : 0,
          watched: data.list === 'watched' ? 1 : 0,
          favorite: data.list === 'favorite' ? 1 : 0,
          review: 0,
          user_id: id,
          movie_id: data.movieId
        }
        userMovieRepository.insert(item, callback)
      } else {
        const item = resp[0];
        item.toWatch = data.list === 'toWatch' ? 1 : item.toWatch;
        item.watched = data.list === 'watched' ? 1 : item.watched;
        item.favorite = data.list === 'favorite' ? 1 : item.favorite;
        userMovieRepository.update(id, item, callback);
      }
    });
  };

  const delList = (id, movieId, callback) => {
    userMovieRepository.del(id, movieId, callback);
  };

  return {
    statistic,
    getList,
    postList,
    delList
  }
})();

module.exports = service;
