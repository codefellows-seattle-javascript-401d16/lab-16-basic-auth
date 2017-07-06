const Router = require('express').Router;
const jsonParser = require('body-parser').json();

const basicAuthMiddleware = require('../lib/basic-auth-middleware.js');
const User = require('../model/user');

const authRouter = new Router();

authRouter.post('/api/signup/', jsonParser, (req, res, next) => {
  console.log('called 2');
  User.create(req.body)
    .then(token => res.status(200).send(token))
    .catch(next);
});

authRouter.get('/api/signin/', basicAuthMiddleware, (req, res, next) => {
  req.user.createToken()
    .then(token => res.status(200).send(token))
    .catch(next);
});

module.exports = authRouter;
