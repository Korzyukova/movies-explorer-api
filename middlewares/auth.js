const jwt = require('jsonwebtoken');
const { AuthorizationError401 } = require('./errorHandlers');

const errorMsg401 = 'Authorization Required';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError401(errorMsg401);
}
const token = authorization.replace('Bearer ', '');
let payload;
const secret = process.env.JWT_SECRET || 'secret-key';
try {
  payload = jwt.verify(token, secret);
} catch (err) {
  throw new AuthorizationError401(errorMsg401);
}
req.user = payload;

next();
};