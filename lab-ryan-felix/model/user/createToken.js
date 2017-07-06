'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(tokenSeed) {
  return jwt.sign({ tokenSeed }, process.env.APP_SECRET);
};
