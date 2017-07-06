'use strict';


module.exports = (err,req,res,next) =>{
  console.log(err);
  if(err.message.includes('validation failed')) return res.sendStatus(400);
  if(err.message.includes('unauthorized')) return res.sendStatus(401);
  if(err.message.includes('ObjectId failed')) return res.sendStatus(404);
  if(err.message.includes('duplicate key error')) return res.sendStatus(409);
  return res.sendStatus(500);
};