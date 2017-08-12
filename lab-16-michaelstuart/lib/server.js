const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
const server = module.exports = {};

app.use(morgan('dev'));
app.use(cors());

app.use(require('../route/auth-router.js'));
app.use(require('./error-middleware.js'));

//eslint-disable-next-line
app.all('/api/*', (req, res, next) => res.sendStatus(404));

server.isOn = false;

server.start = () =>
  new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('server is already running'));
  });

server.stop = () =>
  new Promise((resolve, reject) => {
    if (server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('server is not runnnig'));
  });
