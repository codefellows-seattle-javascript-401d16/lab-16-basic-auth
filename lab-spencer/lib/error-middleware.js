'use strict';

module.exports = (err, req, res, next) => {
  let msg = err.message.toLowerCase();
  if(msg.includes('validation failed') || msg.includes('failed to create tokenseed'))
    return res.sendStatus(400);
  if(msg.includes('unauthorized'))
    return res.sendStatus(401);
  if(msg.includes('duplicate key'))
    return res.sendStatus(409);
  if(msg.includes('objectid failed'))
    return res.sendStatus(404);
  res.sendStatus(500);
};
