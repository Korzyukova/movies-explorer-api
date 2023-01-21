const Movie = require('../models/movies');

const {
  WrongDataError400,
  NotFoundError404,
  RemoveMovieError403,
} = require('../middlewares/errorHandlers');

const errorMsg404 = 'Movie with _id can not be found';
const errorMsg403 = 'Removal movie added by another user';
const errorMsg400 = 'Wrong data while creating movie';

module.exports.getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError400(errorMsg400));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.deleteOne({
    _id: movieId,
    owner: userId,
  })
    .then(async (movies) => {
      if (movies.deletedCount === 0) {
        const c = await Movie.findOne({
          _id: movieId,
        });
        if (c) {
          throw new RemoveMovieError403(errorMsg403);
        } else {
          throw new NotFoundError404(errorMsg404);
        }
      } else {
        res.send({ data: true });
      }
    })
    .catch(next);
};
