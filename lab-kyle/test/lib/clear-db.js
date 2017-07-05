'use strict';

const User = require('../../model/user.js');
const TrailMap = require('../../model/trail-map.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    TrailMap.remove({}),
  ]);
};
