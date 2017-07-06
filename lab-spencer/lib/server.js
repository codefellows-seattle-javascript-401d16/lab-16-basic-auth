'use strict';

const morgan = require('morgan');
const cors = require('cors');


const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const express = require('express');
const app = express();

// app.use(cors());
app.use(morgan('dev'));

app.use(require('../route/authentication-router.js'));

app.all('/api/*', (req, res, next) => res.sendStatus(404));

app.use(require('./error-middleware.js'));

const server = module.exports = {};
server.isUp = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server.isUp) {
      server.isUp = true;
      server.http = app.listen(process.env.PORT, () => {
        console.log(`Server up at localhost:${process.env.PORT}`);
        resolve();
      });
      return;
    }
    reject('Server is already running');
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isUp) {
      return server.http.close(() => {
        server.isUp = false;
        console.log('Server down');
        resolve();
      });
    }
    reject('Server is not on');
  });
};
