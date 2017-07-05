const mongoose = require('mongoose');

const userSchema = require('./userSchema');
const createPasswordHash = require('./createPasswordHash');
const comparePasswordHash = require('./comparePasswordHash');
const createTokenSeed = require('./createTokenSeed');
const createToken = require('./createToken');
const { AuthorizationError, BadRequestError, ServerError } = require('../../lib/auth-errors.js');

userSchema.methods.createPasswordHash = function(password) {
  if(!password) {
    throw new BadRequestError('no password field');
  }
  return createPasswordHash(password)
    .then(hash => {
      this.passwordHash = hash;
      return this;
    });
};

userSchema.methods.comparePasswordHash = function(password) {
  return comparePasswordHash(password, this.passwordHash)
    .then(isCorrect => {
      if(isCorrect)
        return this;
      else
        throw new AuthorizationError('incorrect password');
    });
};

userSchema.methods.createTokenSeed = function() {

  return new Promise((resolve, reject) => {
    let tries = 2;

    let _createTokenSeed = () => {
      this.tokenSeed = createTokenSeed();
      this.save()
        .then(() => {
          resolve(this);
        })
        .catch(() => {
          if(--tries > 0) {
            _createTokenSeed();
          } else {
            return reject(new ServerError(`could not create a token seed after 2 tries`));
          }
        });
    };

    _createTokenSeed();
  });
};

userSchema.methods.createToken = function() {
  return this.createTokenSeed().then((user) => {
    return createToken(user.tokenSeed);
  });
};

const User = mongoose.model('user', userSchema);

User.create = function(data) {
  const password = data.password;
  delete data.password;
  return new User(data).createPasswordHash(password).then(user => user.createToken());
};

module.exports = User;
