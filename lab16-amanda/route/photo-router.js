'use strict';

// npm
const {Router} = require('express');

// app
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Photo = require('../model/photo.js');

// module  logic
const photoRouter = module.exports = new Router();
photoRouter.post('/api/photos', bearerAuth, s3Upload('image'), (req, res, next) => {
  console.log('hit POST /api/photos');
  console.log('user', req.user);
  console.log('file', req.file);
  console.log('s3Data', req.s3Data);

  new Photo({
    title: req.body.title,
    content: req.body.content,
    userID: req.user._id.toString(),
    photoURI: req.s3Data.Location,
  })
  .save()
  .then(photo => res.json(photo))
  .catch(next);
});
