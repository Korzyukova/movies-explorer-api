const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUser,
  updateUser,
  signin,
  signup
} = require('../controllers/users');

router.get('/users/me', auth, getUser);

router.patch('/users/me', auth, updateUser);

router.post('/signup', signup);

router.post('/signin', signin);

module.exports = router;