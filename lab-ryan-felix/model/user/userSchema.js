'use strict';

module.exports = require('mongoose').Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  tokenSeed: { type: String, required: true, unique: true },
});
