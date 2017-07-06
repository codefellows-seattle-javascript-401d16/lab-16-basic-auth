before(() => {
    dotenv.config({ path: `${__dirname}/.env`});
    mongoose.Promise = Promise;
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.MONGODB_URI, err => {
        if(err) reject(err);
        Recipe.remove({}).then(() => resolve());
      });
    });
  });

const dotenv = require('dotenv');
const mongoose = require('mongoose');

module.exports = (Resource) => {
  dotenv.config({ path: `${__dirname}/.env`});
  mongoose.Promise = Promise;
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URI, err => {
      if(err) reject(err);
      Resource.remove({}).then(() => resolve());
    });
  });
}
