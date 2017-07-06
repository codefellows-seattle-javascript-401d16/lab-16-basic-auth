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

  describe('testing 404', () => {
    it('should respond with a 404 status code if invalid route', () => {
      return request.post(`${API_URL}/bad/route`)
        .catch(res => {
          expect(res.status).toEqual(404);
          return request.get(`${API_URL}/bad/route`)
            .catch(res => {
              expect(res.status).toEqual(404);
            });
        });
    });
  });

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

  describe('testing POST /api/signup', () => {
    it('should respond with a 400 status code if no body sent OR invalid body', () => {
      return request.post(`${API_URL}/api/signup`)
        .catch(res => {
          expect(res.status).toEqual(400);
          return request.post(`${API_URL}/api/signup`)
            .send({
              username: 'test_user',
              password: 'super special top secret',
              // email: 'test@example.local', REMOVED TO CREATE INVALID BODY
            })
            .catch(res => {
              expect(res.status).toEqual(400);
            });
        });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with a 401 status code when a user is not found.', () => {
      return mockUser.createOne()
        .then(() => {
          let encoded = new Buffer('BAD-USERNAME:password').toString('base64');
          return request.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with a 200 status code and a token.', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData;
          let encoded = new Buffer(`${tempUser.user.username}:${tempUser.password}`).toString('base64');
          return request.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .then(res => {
          console.log('returned token: ', res.text);
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
  });

  // FINISH TESTS!!!!
});
