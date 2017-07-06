const mongoose = require('mongoose');
const expect = require('expect');

module.exports = (done) => {
  mongoose.disconnect(err => {
    expect(err).toNotExist();
    done();
  });
};
