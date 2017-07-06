'use strict';

const postRouter = module.exports = new require('express').Router();
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Post = require('../model/post.js');

postRouter.post('/api/posts', bearerAuth, s3Upload('image'), (req, res, next) => {
  new Post({
    title: req.body.title,
    caption: req.body.caption,
    imageURI: req.s3Data.Location,
    userID: req.user._id.toString(),
  })
    .save()
    .then((post) => res.json(post))
    .catch(next);
});
