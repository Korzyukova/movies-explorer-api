const Movie = require('../models/movies');

const {
  WrongDataError400,
} = require('../middlewares/errorHandlers');

const errorMsg400 = 'Wrong input data while creating movie';

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
    owner: req.user._id,
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
    .then(() => {
      res.send({ data: true });
    })
    .catch(next);
};
