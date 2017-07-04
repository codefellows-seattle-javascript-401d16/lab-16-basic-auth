'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const superagent = require('superagent');
const expect = require('express');

const server = require('../lib/server.js');
const cleardb = require('./lib/cleardb.js');
// const mockUser = require('./lib/mockUser.js');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Testing user requests', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleardb);

  describe('Testing POST requests for user', () => {
    it('Should return username and hash password with 200 status', () => {
      return superagent.post(`${API_URL}/api/newaccount`)
      .send({
        username: 'new_user',
        email: 'new_user@testing.com',
        pass: '1234',
      })
      .then(res => {
        console.log('testing', res.text);
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });
  });
});
