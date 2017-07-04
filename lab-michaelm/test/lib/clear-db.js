'use strict';

const Leader = require('../../model/leader.js');
const Member = require('../../model/member.js');
const User = require('../../model/user.js');

module.exports = () => {
  return Promise.all([
    Leader.remove({}),
    Member.remove({}),
    User.remove({}),
  ]);
};
