'use strict';

const User = require('../model/user.js');
const httpError = require('http-errors');
const jwt = require('jsonwebtoken');
const universalify = require('universalify');

module.exports = (req, res, next) => {
  let { authorization } = req.headers;

  if (!authorization)
    return next(httpError(401, 'unauthorized missing authorization'));

  let bearerToken = authorization.split('Bearer ')[1];
  if (!bearerToken)
    return next(httpError(401, 'unauthorized no bear auth provided'));
  
  universalify.fromCallback(jwt.verify)(bearerToken, process.env.APP_SECRET)
    .then(decoded =>{
      return User.findOne({tokenSeed: decoded.tokenSeed});
    })
    .then(user =>{
      console.log(user);
      if(!user)
        return next(httpError(401, 'unauthorized user not found'));
      req.user = user;
      next();
    })
    .catch(next);
};