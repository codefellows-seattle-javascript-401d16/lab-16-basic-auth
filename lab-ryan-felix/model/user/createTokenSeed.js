const crypto = require('crypto');

module.exports = function() {
  return crypto.randomBytes(32).toString();
};
