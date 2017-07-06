'use strict';

const User = require('../../model/user.js');
const Gif = require('../../model/gif.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Gif.remove({}),
  ]);
};
