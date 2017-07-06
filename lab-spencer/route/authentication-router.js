'use strict';

const jsonParser = require('body-parser').json();
const {Router} = require('express');
const mongod = require('mongoose');
const User = require('../model/user.js');

app.post('/api/signup', jsonParser, (req, res, next) => {

  res.sendStatus(400);
});

app.get('/api/signin', (req, res, next) => {

});
