'use strict';

const User = require('../../model/user.js');
const PDF = require('../../model/pdf.js');

module.exports = () => {
  return Promise.all([
    User.remove({}),
    PDF.remove({}),
  ]);
};
