'use strict';

const { AuthorizationError, BadRequestError, ServerError } = require('./auth-errors.js');

module.exports = (err, req, res, next) => {
  if(err instanceof AuthorizationError) {
    return res.sendStatus(401);
  }
  else if(err instanceof BadRequestError) {
    return res.sendStatus(400);
  }
  else if(err instanceof ServerError) {
    return res.sendStatus(500);
  }
  else if(err.message.toLowerCase().includes('duplicate key')) {
    return res.sendStatus(409);
  }
  else if(err.message.toLowerCase().includes('objectid failed')) {
    console.log('hit error middleware');
    console.log(err.message);
    return res.sendStatus(404);
  }
  else {
    console.log(`UNHANDLED ERROR: ${err.message}`);
    console.log(err);
    return res.sendStatus(500);
  }
};
