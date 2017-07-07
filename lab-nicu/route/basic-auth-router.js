'use strict';


const jsonParser = require('body-parser').json();
const Router = module.exports = require('express').Router();

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/user.js');

Router.post('/api/signup', jsonParser, (req,res,next) =>{
  User.createUser(req.body)
    .then(token => res.send(token))
    .catch(next);
});

Router.get('/api/login', basicAuth, (req,res,next)=>{
  req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next);
});