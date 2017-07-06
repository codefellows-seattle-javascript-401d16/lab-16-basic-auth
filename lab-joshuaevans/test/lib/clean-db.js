'use strict';

const User = require('../../model/user.js');
const Album = require('../../model/album.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    Album.remove({}),
  ]);
};
