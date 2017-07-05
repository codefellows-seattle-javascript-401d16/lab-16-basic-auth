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
        username: 'henryc',
        password: 'meow',
        email: 'henryc@testmail.com',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });
    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({
        userrrname: 'nicu',
        password: 'meow',
        email: 'henryc@testmail.com',
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/login', () => {
    it('should respond with a token', () => {
      let tempUser;
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
    it('should respond with a 401 status', () => {
      let tempUser;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.username}:jsf`).toString('base64');
        return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${encoded}`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });

});
