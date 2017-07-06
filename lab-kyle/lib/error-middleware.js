'use strict';

module.exports = (err, req, res, next) => {

  // if validation error respond with 400
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  // if invalid body resond with 400
  if(err.message.toLowerCase().includes('data and salt arguments required'))
    return res.sendStatus(400);

  // if user can not be authenticated resond with 401
  if(err.message.toLowerCase().includes('unauthorized'))
    return res.sendStatus(401);

  // if duplacte key respond with 409
  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409);

  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  res.sendStatus(500);
};
