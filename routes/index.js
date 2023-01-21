const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.use(userRoutes);
router.use(movieRoutes);

module.exports = router;
