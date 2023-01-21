const DefaultError500 = require('./defaultError500');
const RemoveMovieError403 = require('./removeMovieError403');
const AuthorizationError401 = require('./authorizationError401');
const WrongDataError400 = require('./wrongDataError400');
const NotFoundError404 = require('./notFoundError404');
const UserExistsError409 = require('./userExistsError409');
const ConflictError11000 = require('./conflictError11000');

const errorHandler = (err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
};

module.exports = {
  DefaultError500,
  AuthorizationError401,
  RemoveMovieError403,
  WrongDataError400,
  NotFoundError404,
  UserExistsError409,
  ConflictError11000,
  errorHandler,
};
