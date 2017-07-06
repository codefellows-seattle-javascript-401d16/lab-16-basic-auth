'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Gif = require('../model/gif.js');


const gifRouter = module.exports = new Router();

gifRouter.post('/api/giphies', bearerAuth, s3Upload('image'), (req,res, next) => {
  new Gif({
    title: req.body.title,
    description: req.body.description,
    gifURI: req.s3Data.Location,
  })
  .save()
  .then(gif => res.json(gif))
  .catch(next);
});
