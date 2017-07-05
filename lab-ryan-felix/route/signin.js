const basicAuthMiddleware = require('../lib/basic-auth-middleware.js');

module.exports = (router, path) => {
  router.get(path, basicAuthMiddleware, (req, res, next) => {
    req.user.createToken()
      .then(token => res.status(200).send(token))
      .catch(next);
  });
};
