'use strict';

const Router = module.exports = require('express').Router();

const s3Uploader = require('../lib/s3-uploader-middleware.js');
const Exercise = require('../model/exercise.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

Router.post('/api/exercise', bearerAuth, s3Uploader('image'), (req, res, next) => {
  
  new Exercise({
    userId: req.user._id.toString(),
    exerciseName: req.body.exerciseName,
    imageURI: req.s3Data.Location,
    muscle: req.body.muscle,
  })
    .save()
    .then(exercise => res.json(exercise))
    .catch(next);
});