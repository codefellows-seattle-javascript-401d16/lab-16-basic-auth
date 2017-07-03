'use strict';

// test 404 for routes that have not been registered
// test POST 400 respond with http-errors 401 name, for if no body provided or invalid body
// test POST 200 response body like <token> for a post request with a valid body
// test GET 401 responds with http-errors 401 name, if the users could not be authenticated
// test GET 200 response body like <token> for a request with a valid basic auth header

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/signup', () => {
    it('should respond with a token', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: 'test_user',
          password: 'top secret',
          email: 'test_user@example.slugz',
        })
        .then(res => {
          console.log('token we got back', res.text);
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should return 400 for a bad request if the body is missing or invalid', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .catch(res => {
          expect(res.status).toEqual(401);
          expect(res.body).toEqual(undefined);
        });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with a token', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          console.log('tempUser', tempUser);
          let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .then(res => {
          console.log('token we got back', res.text);
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should return 404 if route has not been registered', () => {
      return superagent.get(`${API_URL}/api/sluggytrees/blab`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
    it('should respond with a 401 if the user is not authenticated', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = new Buffer(`${tempUser.username}:${userData.password}`);
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });
});
