const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', auth, getMovies);

router.post('/movies', auth, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri({
      scheme: [
        /https?/,
      ],
    }),
    trailerLink: Joi.string().required().uri({
      scheme: [
        /https?/,
      ],
    }),
    thumbnail: Joi.string().required().uri({
      scheme: [
        /https?/,
      ],
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:movieId', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = router;
