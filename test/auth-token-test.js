'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');
const cleardb = require('./lib/cleardb.js');
const mockUser = require('./lib/mockUser.js');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Testing user requests', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleardb);

  describe('Testing POST requests for user', () => {
    it('Should return username and hash password with 200 status', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({
        userName: 'new_user',
        email: 'new_user@testing.com',
        pass: '1234',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });
    it('should respond with status of 400', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });
  describe('Testing GET requests', () => {
    it('should respond with user values and status of 200', () => {
      let tempUser;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.userName}:${userData.pass}`).toString('base64');
        return superagent.get(`${API_URL}/api/signin`)
        .set('Authorization', `Basic ${encoded}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      });
    });
    it('should respond with a 401 stats', () => {
      return superagent.get(`${API_URL}/api/signin`)
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });
});
