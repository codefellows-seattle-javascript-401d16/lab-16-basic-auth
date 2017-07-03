'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('expect');
const superagent = require('superagent');

//app modules
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

// your tests should start your server when they begin and stop your server when they finish

describe('testing auth-router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  let data = {
    username: 'test-user',
    password: 'topsecret',
    email: 'test_user@example.com',
  };

  // write a test to ensure that your api returns a status code of 404 for routes that have not been registered
  describe('testing un-registered routes', () => {
    it('should return 404 for unregistered routes', () => {
      return superagent.post(`${API_URL}/api/not-a-route/`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  // /api/signup

  // POST - test 200, response body like <token> for a post request with a valid body

  describe('testing POST /api/signup', () => {
    it('should respond with a token and status 200', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });

    // POST - test 400, responds with the http-errors 401 name, for if no body provided or invalid body

    it('should respond with a status 401 if no body provided or invalid body', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({
        username: '',
        password: '',
        email: '',
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });

  // /api/signin
  describe('testing GET /api/signin', () => {

    // GET - test 200, response body like <token> for a request with a valid basic auth header

    it('should respond with status 200 and a token', () => {
      let tempUser;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
        return superagent.get(`${API_URL}/api/signin`).set('Authorization', `Basic ${encoded}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });

    // GET - test 401, responds with the http-errors 401 name, if the users could not be authenticated
    it('should respond with status 401 if user cannot be authenticated', () => {
      let tempUser;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.username}:'asdasdf'`).toString('base64');
        return superagent.get(`${API_URL}/api/signin`).set('Authorization', `Basic ${encoded}`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });
});//Close Final Describe Block
