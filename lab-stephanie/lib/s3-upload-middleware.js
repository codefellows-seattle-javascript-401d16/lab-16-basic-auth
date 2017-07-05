'use strict';

const fs = require('fs-extra');
const path = require('path');
const { S3 } = require('aws-sdk');
const multer = require('multer');

const s3 = new S3();
const upload = multer({ dest: `${__dirname}/../temp-assets` });

module.exports = fieldname => (req, res, next) => {
  upload.single(fieldname)(req, res, err => {
    if (err) return next(err);
    if (!req.file) return next(new Error('validation failed'));
    s3
      .upload({
        // access control list: configure read/write privaliges to the objects
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
        Body: fs.createReadStream(req.file.path)
      })
      .promise()
      .then(s3Data => {
        req.s3Data = s3Data;
        return fs.remove(req.file.filename);
      })
      .then(() => next())
      .catch(next);
  });
};
