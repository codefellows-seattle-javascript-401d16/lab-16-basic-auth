'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const cleanDB = require('./lib/cleanDB.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing user auth router', () => {
  describe('testing POST at /api/signup', () => {
    it('should respond with 200 and a token', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({})
    });
  });
});
