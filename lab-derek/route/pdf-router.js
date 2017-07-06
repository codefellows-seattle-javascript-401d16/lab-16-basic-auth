'use strict';

//npm modules
const {Router} = require('express');

//app modules
const PDF = require('../model/pdf.js');
const s3Upload = require('../lib/s3-upload-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

//module logic
const pdfRouter = module.exports = new Router();

pdfRouter.post('/api/pdfs', bearerAuth, s3Upload('pdf'), (req, res, next) => {
  console.log('hit POST /api/pdfs');

  new PDF({
    title: req.body.title,
    tag: req.body.tag,
    userID: req.user._id.toString(),
    pdfURI: req.s3Data.Location,
  })
  .save()
  .then(pdf => res.json(pdf))
  .catch(next);
});
