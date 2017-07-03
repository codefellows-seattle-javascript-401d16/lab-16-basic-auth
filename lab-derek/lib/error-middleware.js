'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);
  //if validation error respond with 400
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  //if duplicate key respond with 409
  if(err.message.toLowerCase().includes('duplciate key'))
    return res.sendStatus(409);

  //if id not found repsond with 404
  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  //if password/username validation error respond with 401
  if(err.message.toLowerCase().includes('unauthorized'))
    return res.sendStatus(401);

  if(err.message.toLowerCase().includes('failed to create tokenseed'))
    return res.sendStatus(401);

  res.sendStatus(500);
};
