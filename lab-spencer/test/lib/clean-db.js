'use strict';

const User = require('../../model/user.js');
const Pet = require('../../model/pet.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Pet.remove({}),
  ]);
};
