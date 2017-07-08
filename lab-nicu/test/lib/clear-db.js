'use strict';

const User = require('../../model/user.js');
const Exercise = require('../../model/exercise.js');
module.exports = () =>{
  return Promise.all([
    User.remove({}),
    Exercise.remove({}),
  ]);
};