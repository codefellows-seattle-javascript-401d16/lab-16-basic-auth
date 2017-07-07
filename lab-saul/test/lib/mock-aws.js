'use strict';

const awsMock = require('aws-sdk-mock');
awsMock.mock('S3', 'upload', function(params, callback){
  if(params.ACL !== 'public-read')
    return callback(new Error('ACL must be public-read'));
  if(params.AWS_BUCKET !== 'fake-bucket')
    return callback(new Error('bucket must be fake bucket'));
  if(!params.Key)
    return callback(new Error('key must be a set'));
  if(!params.Body)
    return callback(new Error('body must be set'));
  callback(null, {
    Key: params.Key,
    Location: 'fakeaws.s3.com/fake-bucket/${params.Key}',
  });
});
