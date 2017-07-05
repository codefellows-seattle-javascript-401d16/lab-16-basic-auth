'user strict';

const User = require('../model/user.js');
const httpError = require('http-errors');

module.exports = (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization)
    return next(httpError(401,'unauthorized no authorization provided'));

  let encoded = authorization.split('Basic')[1];
  if (!encoded)
    return next(httpError(401,'unauthorized basic auth provided'));

  let decoded = new Buffer(encoded, 'base64').toString();
  let [username, password] = decoded.split(':');

  if (!username || !password) 
    return next(httpError(401,'unauthorized username or password was missing'));
  
  User.findOne({username})
    .then(user =>{
      if(!user)
        return next(httpError(401,'unauthorized user does not exist'));
      return user.passwordHashCompare(password);
    })
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => next(httpError(401,'unauthorized unable to locate user in auth middleware')));
};