'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/userAuthRouter.js'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

app.use(require('./error-middleware.js'));

const server = module.exports = {};

server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('Server is up at PORT:', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('Sever is already UP'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        console.log('Server is Down');
        resolve();
      });
    }
    reject(new Error('Server is not running'));
  });
};
