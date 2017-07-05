const jsonParser = require('body-parser').json();
const User = require('../model/user');

module.exports = (router, path) => {
  console.log('called 1');
  router.post(path, jsonParser, (req, res, next) => {
    console.log('called 2');
    User.create(req.body)
      .then(token => res.status(200).send(token))
      .catch(next);
  });
};
