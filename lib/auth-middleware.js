'use strict';

const User = require('../model/user.js');

module.exports = (req, res, next) => {
  const {authorization} = req.headers;

  if(!authorization)
    return next(new Error('No authorization provided!'));

  let encoded = authorization.split('Basic ')[1];
  if(!encoded)
    return next(new Error('No basic Auth provided'));

  let decoded = new Buffer(encoded, 'base64').toString();
  let [userName, pass] = decoded.split(':');

  if(!userName || !pass)
    return next(new Error('No userName or password provided'));

  User.findOne({userName})
  .then(user => {
    if(!user)
      return next(new Error('User not Found'));
    return user.passHashCompare(pass);
  })
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => {
    next(new Error('Find failed in auth middleware'));
  });
};
