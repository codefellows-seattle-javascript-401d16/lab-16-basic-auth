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
      .then(res => {
        expect(res.status).toEqual(404);
      });
    });
  });


});//Close Final Describe Block



// /api/signup
// POST - test 400, responds with the http-errors 401 name, for if no body provided or invalid body
// POST - test 200, response body like <token> for a post request with a valid body
// /api/signin
// GET - test 401, responds with the http-errors 401 name, if the users could not be authenticated
// GET - test 200, response body like <token> for a request with a valid basic auth header
