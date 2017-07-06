'use strict';

const userAuthRouter = module.exports = new require('express').Router();
const jsonParser = require('body-parser').json();
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

userAuthRouter.post('/api/signup', jsonParser, (req, res, next) => {
  User.create(req.body)
    .then((token) => res.send(token))
    .catch(next);
});

userAuthRouter.get('/api/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
    .then((token) => res.send(token))
    .catch(next);
});
