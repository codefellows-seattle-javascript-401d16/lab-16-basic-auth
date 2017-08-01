'use strict';

const faker = require('faker');
const User = require('../../model/user.js');

const mockUser = module.exports = {};

mockUser.createOne = () => {
  let result = {};
  result.pass = faker.internet.password();
  return new User({
    userName: faker.internet.userName(),
    email: faker.internet.email(),
  })
  .passHashCreate(result.pass)
  .then(user => {
    result.user = user;
    return user.tokenCreate();
  })
  .then(token => {
    result.token = token;
    return result;
  });
};
