'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
const expect = require('expect');
const superAgent = require('superagent');

const mockUser = require('./lib/mock-user.js');
const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const API_URL = `${process.env.API_URL}:${process.env.PORT}`;

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/signup', () => {
    it('should respond with a 200 and a token', () => {
      return superAgent.post(`${API_URL}/api/signup`)
        .send({
          username: 'nicu',
          password: 'dang',
          email: 'nicu@text.com',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
        });
    });
    it('should respond with a 401 and a token', () => {
      return superAgent.post(`${API_URL}/api/signup`)
        .send({
          username: 'nicu',
          daf123: '11111',
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with a 200 ', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
          return superAgent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });

    it('should respond with a 401 ', () => {
      let encoded = new Buffer('invalidUsername:invalidPassword').toString('base64');
      return superAgent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${encoded}`)
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });

  describe('testing unregistered routes', () => {
    it('should return a 404', () => {
      return superAgent.get(`${API_URL}/api/loginsssssssss`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});