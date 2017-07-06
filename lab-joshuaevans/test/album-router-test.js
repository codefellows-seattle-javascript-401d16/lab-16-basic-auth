'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing album router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST to /api/albums/', () => {
    it('should respond with a new album, 200 status code', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/albums`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('name', 'albumtitle')
        .field('artist', 'artistname')
        .attach('image', `${__dirname}/assets/album.jpg`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });
});
