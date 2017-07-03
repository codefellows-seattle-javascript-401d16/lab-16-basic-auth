'use strict';

const User = require('../model/user.js')
model.exports = (req, res, next) => {
  const {authorization} = req.headers

  if(!authorization)
  return next (new Error('Unauthorized no authorization provided'))

  let encoded = authorization.split('Basic ')[1]
  if(!encoded)
  return next(new Error('Unauthorizedno basic auth provided'))

  let decoded = new Buffer(encoded, 'base64').toString()
  let [username, password] = decoded.split(':')

  if(!username || !password)
  return next(new Error('Unauthorized username or password was missing'))

  console.log('decoded', decoded)
  console.log('username', username)
  console.log('password', password)

  User.findOne({username})
  .then(user => {
    if(!user)
    return next(new Error('Unauthorized user does not exist'))
    return user.passwordHashCompare(password)
  })
  .then(user => {
    req.user = user
    next()
  })
  .catch(err => {
    console.log('errrrrrrrr', err)
    next(new Error('Unauthorized find one failed in bsic auth middleware'));
  })
}
