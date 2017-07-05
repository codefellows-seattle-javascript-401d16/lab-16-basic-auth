'use strict';

// npm
const {Router} = require('express');

// app
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Map = require('../model/map.js');

// module logic
const mapRouter = module.exports = new Router();
mapRouter.post('/api/articles', bearerAuth, s3Upload('image'), (req, res, next) => {
  console.log('hit POST /api/maps');
  console.log('user', req.user);
  console.log('file', req.file);
  console.log('s3Data', req.s3Data);

  new Map({
    title: req.body.title,
    hint: req.body.hint,
    userID: req.user._id.toString(),
    photoURI: req.s3Data.Location,
  })
  .save()
  .then(map => res.json(map))
  .catch(next);
});
