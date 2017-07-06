'use strict';

const {Router} = require('express');
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Pet = require('../model/pet.js');

const petRouter = module.exports = new Router();

petRouter.post('/api/pets', bearerAuth, s3Upload('image'), (req, res, next) => {
  new Pet({
    name: req.body.name,
    type: req.body.type,
    photoURI: req.s3Data.Location,
    userID: req.user._id.toString(),
  })
  .save()
  .then(pet => res.json(pet))
  .catch(next);
});
