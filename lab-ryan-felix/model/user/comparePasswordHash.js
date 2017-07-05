'use strict';

const bcrypt = require('bcrypt');

module.exports = function(password1, password2) {
  return bcrypt.compare(password1, password2);
};
