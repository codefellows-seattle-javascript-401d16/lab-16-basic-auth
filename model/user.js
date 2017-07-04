'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  passHash: {type: String, required: true},
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  tokenSeed: {type: String, required: true, unique: true},
});

userSchema.methods.passHashCreate = function(pass) {
  return bcrypt.hash(pass, 8)
  .then(hash => {
    this.passHash = hash;
    return this;
  });
};

userSchema.methods.passHashCompare = function(pass) {
  return bcrypt.compare(pass, this.passHash)
  .then(isMatch => {
    if(isMatch)
      return this;
    throw new Error('Password is not a match!');
  });
};

userSchema.methods.tokenSeedCreate = function() {
  return new Promise((resolve, reject) => {
    let tries = 1;
    let firstTokenSeedCreate = () => {
      this.tokenSeed = crypto.randomBytes(32).toString('hex');
      this.save()
      .then(() => resolve(this))
      .catch(err => {
        if(tries < 1)
          return reject(new Error('Server could not create Token Seed'));
        tries--;
        firstTokenSeedCreate();
      });
    };
    firstTokenSeedCreate();
  });
};

userSchema.methods.tokenCreate = function() {
  return this.tokenSeedCreate()
  .then(() => {
    return jwt.sign({tokenSeed: this.tokenSeed}, process.env.APP_SECRET);
  });
};

const User = module.exports = mongoose.model('user', userSchema);

User.create = function(data) {
  let pass = data.pass;
  delete data.pass;
  return new User(data).passHashCreate(pass)
  .then(user => user.tokenCreate());
};
