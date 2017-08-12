const { Router } = require('express');
const jsonParser = require('body-parser').json();

const User = require('../model/user');
const basicAuth = require('../lib/basic-auth-middleware');

const authRouter = module.exports = new Router();

authRouter.post('/api/auth/register', jsonParser, (req, res, next) => {
  if (!req.body.password || !req.body.username) return next(new Error('required arguments'));
  User.create(req.body)
    .then(token => res.send(token))
    .catch(next);
});

authRouter.get('/api/auth/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next);
});
