'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/signup', () => {
    it('should respond with a token', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({
        username: 'test_user',
        password: 'secret',
        email: 'test_user@test.com',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });

    it('should respond with 400', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({user: 'test_user'})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with token', () => {
      let tempUser ;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
        return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${encoded}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });

    it('should respond with 401', () => {
      let tempUser ;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.username}:password`).toString('base64');
        return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${encoded}`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });
});
