'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');
const API_URL = process.env.API_URL;

describe('Pet Router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('POST /api/pets', () => {
    it('Should respond with a pet (post)', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/pets`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('name', 'Spencer')
            .field('type', 'Beagle')
            .attach('image', `${__dirname}/assets/me.jpg`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Spencer');
          expect(res.body.type).toEqual('Beagle');
          expect(res.body.userID).toEqual(tempUserData.user._id.toString());
          expect(res.body.photoURI).toExist();
        });
    });
    it('Should respond 400 bad request', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/pets`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('name', 'Spencer')
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('Should respond 401 unauthorized', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/pets`)
            .field('name', 'Spencer')
            .field('type', 'Beagle')
            .attach('image', `${__dirname}/assets/me.jpg`);
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });
});
