'use strict';

require('dotenv').config({ path: `${__dirname}/../.test.env` });
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const mockUser = require('./lib/mock-user.js');
const cleanDB = require('./lib/clear-db');

const API_URL = describe('testing article router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe.only('testing POST /api/articles', () => {
    it('should respond with an article', () => {
      let tempUserData;
      mockUser
        .createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent
            .post(`${API_URL}/ai/articles`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('title', 'example title')
            .field('content', 'example content')
            .attach('image', `${__dirname}/assets/data.gif`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.content).toEqual('example content');
          expect(res.body.title).toEqual('example title');
          expect(res.body.userId).toEqual(tempUserData.user._id.toString());
          expect(res.body.photoURI).toExist();
        });
    });
  });
});
