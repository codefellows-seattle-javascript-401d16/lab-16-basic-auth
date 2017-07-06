'use strict';

const User = require('../../model/user.js');
const Blog = require('../../model/blog.js');


module.exports = () => {
  return Promise.all([
    User.remove({}),
    Blog.remove({}),
  ]);
};
