'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-middleware.js');
const Album = require('../model/album.js');

const albumRouter = module.exports = new Router();

albumRouter.post('/api/albums', bearerAuth, s3Upload('image'), (req, res, next) => {
  new Album({
    name: req.body.name,
    artist: req.body.artist,
    userId: req.user_id.toString(),
    photoURI: req.s3Data.Location,
  })
  .save()
  .then(album => res.json(album))
  .catch(next);
});
