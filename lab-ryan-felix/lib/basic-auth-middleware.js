'use strict';

const parseBasicAuth = require('./parse-basic-auth.js');
const { AuthorizationError, ServerError } = require('./auth-errors.js');
const User = require('../model/user');

module.exports = (req, res, next) => {
  let username, password;
  try {
    const authInfo = parseBasicAuth(req.headers.authorization);
    username = authInfo.username;
    password = authInfo.password;
  } catch(err) {
    return next(err);
  }

  User.findOne({username})
    .then(user => {
      if(!user)
        return next(new AuthorizationError('user not found'));
      return user.comparePasswordHash(password);
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => next(new ServerError(err)));
};
