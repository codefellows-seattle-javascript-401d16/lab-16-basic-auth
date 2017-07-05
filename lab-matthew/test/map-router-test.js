'use strict';

// load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

// npm
const expect = require('expect');
const superagent = require('superagent');

// app
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing map router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/maps', () => {
    it('should respond with a map', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/maps`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'The Lost Treasure of Atlantis')
        .field('hint', 'x marks the spot')
        .attach('image', `${__dirname}/assets/treasure-map.jpg`);
      })
      .then(res => {
        console.log('res.body', res.body);
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('The Lost Treasure of Atlantis');
        expect(res.body.hint).toEqual('x marks the spot');
        expect(res.body.photoURI).toExist();
      });
    });
    it('should respond with a 401 unauthorized', () => {
      return mockUser.createOne()
      .then(() => {
        return superagent.post(`${API_URL}/api/maps`)
        .field('title', 'The Lost Treasure of Atlantis')
        .field('hint', 'x marks the spot')
        .attach('image', `${__dirname}/assets/treasure-map.jpg`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
    it('should respond with a 400 invalid body', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/maps`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'The Lost Treasure of Atlantis')
        .field('hint', 'x marks the spot');
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
});
