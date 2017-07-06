'use strict';

const path = require('path');
const fse = require('fs-extra');
const { S3 } = require('aws-sdk');
const multer = require('multer');

const { BadRequestError } = require('./auth-errors.js');

const s3 = new S3();
const upload = multer({dest: `${__dirname}/../temp-assets`});

module.exports = (fieldName) => (req, res, next) => {

  upload.single(fieldName)(req, res, (err) => {
    if(err) {
      return next(err);
    }
    if(!req.file) {
      return next(new BadRequestError('no file found'));
    }

    s3.upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fse.createReadStream(req.file.path),
    })
    .promise()
    .then(s3data => {
      req.s3data = s3data;
      return fse.remove(req.file.filename);
    })
    .then(() => next())
    .catch(err => next(err));
  });
};
