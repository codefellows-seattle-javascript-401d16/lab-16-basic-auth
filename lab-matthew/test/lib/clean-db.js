'use strict';

const User = require('../../model/user.js');
const Map = require('../../model/map.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Map.remove({}),
  ]);
};
