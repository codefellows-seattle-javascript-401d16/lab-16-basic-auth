'use strict';

require('dotenv').config({path:`${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing article router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/blogs', () => {
    it('should respond with a blog post', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/blogs`)
          .set('Authorization', `Bearer ${tempUserData.token}`)
          .field('title', 'female software developer in Seattle')
          .field('content', 'hello microsoft google facebook can I have a job please?')
          .attach('image', `${__dirname}/assets/giphy.gif`);
        })
        .then(res => {
          console.log('res.body', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.content).toEqual('hello microsoft google facebook can I have a job please?');
          expect(res.body.title).toEqual('female software developer in Seattle');
          expect(res.body.userID).toEqual(tempUserData.user._id.toString());
          expect(res.body.photoURI).toExist();
        });
    });
  });
});
