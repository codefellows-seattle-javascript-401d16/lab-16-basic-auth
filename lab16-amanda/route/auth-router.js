'use strict';

// npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

const authRouter = module.exports = new Router();

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  console.log('hit /api/signup', req.body);
  if(!req.body.username) {
    console.log('inside post 400');
    return next(new Error('no req body'));
  }

  User.create(req.body)
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/api/login', basicAuth, (req, res, next) => {
  console.log('hit /api/login');

  req.user.tokenCreate()
  .then(token => res.send(token))
  .catch(next);
});
