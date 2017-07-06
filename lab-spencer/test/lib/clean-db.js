'use strict';

const User = require('../../model/user.js');

module.expots = () => {
  return Promise.all([
    User.remove({}),
  ]);
};
