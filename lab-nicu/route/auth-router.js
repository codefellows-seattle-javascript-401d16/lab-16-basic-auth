'use strict';


const jsonParser = require('body-parser').json();
const Router = module.exports = require('express').Router();

const auth = require('../lib/auth-middleware.js');
const User = require('../model/user.js');

Router.post('/api/signup', jsonParser, (req,res,next) =>{
  User.createUser(req.body)
    .then(token => res.send(token))
    .catch(next);
});

Router.get('/api/login', auth, (req,res,next)=>{
  req.user.tokenCreate()
    .then(token => res.send(token))
    .catch(next);
});