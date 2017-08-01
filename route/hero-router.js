'use strict';

const {Router} = require('express');

const Hero = require('../model/hero.js');
const bearAuth = require('../lib/bearer-middleware.js');
const s3upload = require('../lib/s3-middleware.js');

const heroRouter = module.exports = new Router();

heroRouter.post('/api/heroes', bearAuth, s3upload('image'), (req, res, next) => {
  console.log('post', req.body);
  new Hero({
    title: req.body.title,
    userID: req.user._id.toString(),
    imageURI: req.s3Data.Location,
  })
  .save()
  .then(hero => res.json(hero))
  .catch(next);
});
