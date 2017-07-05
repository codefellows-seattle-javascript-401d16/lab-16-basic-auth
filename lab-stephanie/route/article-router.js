'use strict';
const { Router } = require('express');

const s3Upload = require('../lib/s3-upload-middleware.js');
const Article = require('../model/article.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const articleRouter = (module.exports = new Router());

articleRouter.post('/api/articles', s3Upload('image'), (req, res, next) => {
  console.log('hit articles POST');
  console.log(req.s3Data);
  console.log(req.file);
  console.log(req.user);

  new Article({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.user._id.toString(),
    photoURI: req.s3Data.Location
  })
    .save()
    .then(article => res.json(article))
    .catch(next);
});
