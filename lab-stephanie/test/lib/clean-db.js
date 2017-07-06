'use strict';

const User = require('../../model/user.js');
const ProfilePic = require('../../model/profile-pic.js');

module.exports = () => {
  return Promise.all([User.remove({}), ProfilePic.remove({})]);
};
