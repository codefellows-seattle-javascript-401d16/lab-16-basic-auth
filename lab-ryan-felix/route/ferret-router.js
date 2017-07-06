'use strict';

const Router = require('express').Router;
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const Ferret = require('../model/ferret.js');

const ferretRouter = new Router();

ferretRouter.post('/api/ferrets', bearerAuth, s3Upload('image'), (req, res, next) => {
  new Ferret({
    name: req.body.name,
    userID: req.user._id.toString(),
    photoURI: req.s3data.Location,
  })
  .save()
  .then(ferret => res.json(ferret))
  .catch(next);
});

module.exports = ferretRouter;
