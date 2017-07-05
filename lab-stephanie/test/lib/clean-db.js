'use strict';

const User = require('../../model/user.js');
const Article = require('../../model/article.js');

module.exports = () => {
  return Promise.all([User.remove({}), Article.remove({})]);
};
