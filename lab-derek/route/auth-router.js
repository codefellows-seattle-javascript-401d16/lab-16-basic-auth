'use strict';

//npm modules
const {Router} = require('express');
const jsonParser = require('body-parser').json();

//app modules
const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

//module logic
const authRouter = module.exports = new Router();

// /api/signup
//
// POST request
// the client should pass the username and password in the body of the request
// the server should respond with a token generated using jsonwebtoken and the users findHash
// the server should respond with a 400 Bad Request to failed request

authRouter.post('/api/signup', jsonParser, (req, res, next) => {
  console.log('hit POST /api/sigup');
  User.create(req.body)
  .then(token => res.send(token))
  .catch(next);
});

// /api/signin
//
// GET request
// the client should pass the username and password to the server using a Basic auth header
// the server should respond with a token to authenticated users
// the server should respond with a 401 Unauthorized to non authenticated users

authRouter.get('/api/signin', basicAuth, (req, res, next) => {
  console.log('hit GET /api/login');
  req.user.tokenCreate()
  .then(token => res.send(token))
  .catch(next);
});
