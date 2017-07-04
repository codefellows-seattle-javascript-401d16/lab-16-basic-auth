'use strict';

//load test environment
require('dotenv').config({path: './test/.env'});
const API_URL = `http://localhost:${process.env.PORT}`;

//npm modules
const request = require('superagent');
const expect = require('expect');

//app modules
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/signup', () => {
    it('should respond with a 200 status code and a token', () => {
      return request.post(`${API_URL}/api/signup`)
        .send({
          username: 'test_user',
          password: 'super special top secret',
          email: 'test@example.local',
        })
        .then(res => {
          console.log('returned token', res.text);
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
  });

  // FINISH TESTS!!!!
});
