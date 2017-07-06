'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user.js');
const universalify = require('universalify');

module.exports = (req, res, next) => {
  //if any of hte folowing will fial we will netx an authorizationed Error
  // check for auth header
  let {authorization} = req.headers;
  if(!authorization)
    return next(new Error('unauthorized no auth header'));


  //check for bearer token
  let token = authorization.split('Bearer ')[1];
  if (!token)
    return next(new Error('authorizated'));

    //decrypt the toke
  universalify.fromCallback(jwt.verify)(token, process.env.APP_SECRET)
  //find hte user by tokenSeed
  .then(decoded => User.findOne({tokenSeed: decoded.tokenSeed}))
  .then(user => {
    if(!user)
      throw new Error('unauthorized no user found');
    //add the user to the req object
    req.user = user;
  //next
    next();
  })
  .catch(next);
};
