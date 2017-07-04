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
  let [username, pass] = decoded.split(':');

  if(!username || !pass)
    return next(new Error('No username or password provided'));

  User.findOne({username})
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
    console.log('errrrr', err);
    next(new Error('Find failed in auth middleware'));
  });
};
