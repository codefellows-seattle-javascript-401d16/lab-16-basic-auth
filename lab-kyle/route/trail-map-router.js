'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const TrailMap = require('../model/trail-map.js');

const trailMapRouter = module.exports = new Router();

trailMapRouter.post('api/trailMaps', bearerAuth, s3Upload('image'), (req, res, next) => {
  console.log('hit POST api/trailMaps');

  new TrailMap({
    //userID: req.user._id.toString(),
    name: req.body.name,
    description: req.body.description,
    mapURI: req.s3Data.Location,
  })
  .save()
  .then(article => res.json(article))
  .catch(next);
});
