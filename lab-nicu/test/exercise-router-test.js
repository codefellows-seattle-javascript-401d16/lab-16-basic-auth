'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = `${process.env.API_URL}:${process.env.PORT}`;

describe('testing exercise router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/exercise', () => {
    it('should respond with an exercise', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/exercise`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('exerciseName', 'Push Up')
            .field('muscle', 'Chest')
            .attach('image', `${__dirname}/assets/pushup-good.jpg`);
        })
        .then(res => {
          console.log('res.body', res.body);
          expect(res.status).toEqual(200);
        });
    });
  });
});