'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('../route/auth-router.js');
const authErrorMiddleware = require('./auth-error-middleware.js');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(morgan('dev'));
app.use(cors());


app.use(authRouter);
app.all('/api/*', (req, res) => res.sendStatus(404));
app.use(authErrorMiddleware);



const server = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log(`auth server up on port ${process.env.PORT}`);
        resolve();
      });
    }
    else {
      reject(new Error('server already running'));
    }
  });
};
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn && server.http) {
      return server.http.close(() => {
        server.isOn = false;
        console.log('auth server stopped');
        resolve();
      });
    }
    else {
      reject(new Error('server is not running'));
    }
  });
};

module.exports = server;
