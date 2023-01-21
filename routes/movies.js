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
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
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
    owner: Joi.string().required().min(2).max(50),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:_id', auth, deleteMovie);

module.exports = router;
