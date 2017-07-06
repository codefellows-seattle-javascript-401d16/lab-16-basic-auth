'use strict';

//load test environment
require('dotenv').config({path: './test/.env'});
const API_URL = `http://localhost:${process.env.PORT}`;

// NPM modules
const expect = require('expect');
const request = require('superagent');

// app modules
require('./lib/mock-aws.js');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

describe('testing photo router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/photos', () => {
    it('should respond with a photo', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return request.post(`${API_URL}/api/photos`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('title', 'example title')
            .field('content', 'example content')
            .attach('image', './test/assets/kata-status.png');
        })
        .then(res => {
          console.log('res.body: ', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.content).toEqual('example content');
          expect(res.body.title).toEqual('example title');
          expect(res.body.userID).toEqual(tempUserData.user._id.toString());
          expect(res.body.photoURI).toExist();
        });
    });
  });

  describe('testing POST /api/photos without a body', () => {
    it('should respond with a 400 status code', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return request.post(`${API_URL}/api/photos`)
            .set('Authorization', `Bearer ${tempUserData.token}`);
        })
        .catch(res => {
          expect(res.body).toNotExist();
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing POST /api/photos without authentication', () => {
    it('should respond with a 401 status code.', () => {
      return request.post(`${API_URL}/api/photos`)
        .field('title', 'example title')
        .field('content', 'example content')
        .attach('image', './test/assets/kata-status.png')
        .catch(res => {
          expect(res.body).toNotExist();
          expect(res.status).toEqual(401);
        });
    });
  });

});
