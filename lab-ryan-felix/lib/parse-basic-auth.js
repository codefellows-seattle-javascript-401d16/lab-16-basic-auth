const { AuthorizationError } = require('./auth-errors.js');

module.exports = function(rawAuthorization) {
  if(!rawAuthorization) {
    throw new AuthorizationError('no authorization provided');
  }
  const encoded = rawAuthorization.split('Basic ')[1];
  if(!encoded) {
    throw new AuthorizationError('no basic authorization provided');
  }
  const [username, password] = new Buffer(encoded, 'base64').toString().split(':');
  if(!username) {
    throw new AuthorizationError('no username provided');
  }
  if(!password) {
    throw new AuthorizationError('no password provided');
  }
  return { username, password };
};
