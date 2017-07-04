'use strict';

module.exports = (err,req,res,next) => {
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('invalid body'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('unauthorized'))
    return res.sendStatus(401);

  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  if(err.message.includes('duplicate key'))
    return res.sendStatus(409);

  res.sendStatus(500);
};
