const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUser,
  updateUser,
  signin,
  signup,
  signout,
} = require('../controllers/users');

router.get('/users/me', auth, getUser);

router.patch('/users/me', auth, updateUser);

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/signout', auth, signout);

module.exports = router;
