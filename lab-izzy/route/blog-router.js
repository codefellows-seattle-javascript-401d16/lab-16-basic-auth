'use strict';

const {Router} = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/beaer-auth-middleware.js');
const Blog = require('../model/blog.js');

const blogRouter = module.exports = new Router();
blogRouter.post('/api/blogs', bearerAuth, s3Upload('image'), (req, res, next) => {
  console.log('hit POST /api/blogs');
  console.log('user', req.user);
  console.log('file', req.file);
  console.log('s3Data', req.s3Data);

  new Blog({
    title: req.body.title,
    content: req.body.content,
    userID: req.user._id.toString(),
    photoURI: req.s3Data.Location,
  })
  .save()
  .then(blog => res.json(blog))
  .catch(next);
});
