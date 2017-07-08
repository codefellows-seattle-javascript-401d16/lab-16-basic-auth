'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
require('./lib/mock-aws.js');

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
    it('should respond with an exercise and 200', () => {
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
          expect(res.status).toEqual(200);
          expect(res.body.exerciseName).toEqual('Push Up');
          expect(res.body.muscle).toEqual('Chest');
          expect(res.body._id).toExist();
          expect(res.body.userId).toEqual(tempUserData.user._id.toString());
          expect(res.body.imageURI).toExist();
        });
    });

    it('should respond with 400 due to invalid body', () => {
      let tempUserData;
      return mockUser.createOne()
        .then(userData => {
          tempUserData = userData;
          return superagent.post(`${API_URL}/api/exercise`)
            .set('Authorization', `Bearer ${tempUserData.token}`)
            .field('exerciseName', 'Push Up')
            .field('asdfadf', 'Chest');
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should respond with a 401 since authorization was not set', () => {
      return superagent.post(`${API_URL}/api/exercise`)
        .field('exerciseName', 'Push Up')
        .field('muscle', 'Chest')
        .attach('image', `${__dirname}/assets/pushup-good.jpg`)
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });

    
  });
});