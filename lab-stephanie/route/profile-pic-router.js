'use strict';

// npm
const { Router } = require('express');

// app
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const ProfilePic = require('../model/profile-pic.js');

// module  logic
const profilePicRouter = (module.exports = new Router());
profilePicRouter.post(
  '/api/profilepics',
  bearerAuth,
  s3Upload('image'),
  (req, res, next) => {
    console.log('hit POST /api/profilepics');
    new ProfilePic({
      userID: req.user._id.toString(),
      title: req.body.title,
      date: req.body.date,
      photoURI: req.s3Data.Location
    })
      .save()
      .then(profilepic => res.json(profilepic))
      .catch(next);
  }
);
