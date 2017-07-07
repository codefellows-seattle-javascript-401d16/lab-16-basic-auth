'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Gif = require('../model/gif.js');


const gifRouter = module.exports = new Router();

gifRouter.post('/api/giphies', bearerAuth, s3Upload('image'), (req,res, next) => {
  console.log('hitting post route!!!!!!!!');
  new Gif({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    gifURI: req.s3Data.Location,
    userID:req.user._id.toString(),
  })
  .save()
  .then(gif => res.json(gif))
  .catch(next);
});
