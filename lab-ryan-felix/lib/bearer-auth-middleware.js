'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { AuthorizationError } = require('./auth-errors.js');

module.exports = (req, res, next) => {
  let authorization = req.headers.authorization;
  if(!authorization) {
    return next(new AuthorizationError('no header'));
  }

  let token = authorization.split('Bearer ')[1];
  if(!token) {
    return next(new AuthorizationError('no token'));
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if(err) {
      next(err);
    }
    User.findOne({ tokenSeed: decoded.tokenSeed })
    .then(user => {
      if(!user) {
        return next(new AuthorizationError('no user found'));
      }
      req.user = user;
      next();
    })
    .catch(err => next(err));
  });
};
