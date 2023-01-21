const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const {
  AuthorizationError401,
  ConflictError11000,
  WrongDataError400,
} = require('../middlewares/errorHandlers');

const errorMsg401 = 'Authorization error';
const errorMsg400 = 'Wrong data while creating user';
const errorMsg11000 = 'This email already exists';

const secret = process.env.JWT_SECRET || 'secret-key';

module.exports.getUser = (req, res, next) => {
  User.find({
    _id: req.user._id,
  })
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const update = {};
  if (name) update.name = name;
  if (email) update.email = email;
  if (!update) throw new WrongDataError400(errorMsg400);
  User.findOneAndUpdate({ _id: req.user._id }, update, {
    runValidators: true,
    new: true,
  })
    .then(() => res.send(update))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new WrongDataError400(errorMsg400));
      } else {
        next(err);
      }
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then(async (user) => {
      if (!user) {
        throw new AuthorizationError401(errorMsg401);
      } else {
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          throw new AuthorizationError401(errorMsg401);
        } else {
          const token = jwt.sign({ _id: user._id }, secret, {
            expiresIn: '7d',
          });
          res.send({ token });
        }
      }
    })
    .catch(next);
};

module.exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10).catch(next);
  const user = await User.create({
    email,
    name,
    password: hash,
  }).catch((err) => {
    if (err.code === 11000) {
      next(new ConflictError11000(errorMsg11000));
    } else if (err.name === 'ValidationError') {
      next(new WrongDataError400(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });
  res.send({ data: user });
};
const jwtBlackList = [];
module.exports.signout = async (req, res) => {
  jwtBlackList.push(req.user.token);
  res.send('You are logged out');
};
