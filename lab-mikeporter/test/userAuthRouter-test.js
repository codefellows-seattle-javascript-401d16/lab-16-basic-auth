'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});
const expect = require('expect');
const superagent = require('superagent');
const faker = require('faker');
const server = require('../lib/server.js');
const clearDB = require('./lib/clearDB.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing user auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);
  describe('testing POST at /api/signup', () => {
    it('should respond with 200 and a token', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should respond with 400 due to improper body missing username', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 400 due to improper body missing email', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: faker.internet.userName(),
          password: faker.internet.password(),
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 400 due to improper body missing password', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          email: faker.internet.email(),
          username: faker.internet.userName(),
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with 400 due to improper body missing body', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({})
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET on /api/login', () => {
    it('should respond with 200 after sending encoded username:password', () => {
      return mockUser.createOne()
        .then((data) => {
          let encoded = new Buffer(`${data.user.username}:${data.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('should respond with a 401 after sending bad username', () => {
      return mockUser.createOne()
        .then((data) => {
          let encoded = new Buffer(`potato:${data.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch((res) => {
          expect(res.status).toEqual(401);
        });
    });
    it('should respond with a 401 after sending bad password', () => {
      return mockUser.createOne()
        .then((data) => {
          let encoded = new Buffer(`${data.user.username}:catattack`).toString('base64');
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch((res) => {
          expect(res.status).toEqual(401);
        });
    });
    it('should respond with a 401 after sending invalid authorization value', () => {
      return mockUser.createOne()
        .then((data) => {
          return superagent.get(`${API_URL}/api/login`)
            .set('Authorization', `cat`);
        })
        .catch((res) => {
          expect(res.status).toEqual(401);
        });
    });
    it('should respond with a 401 after sending no authorization header', () => {
      return mockUser.createOne()
        .then((data) => {
          return superagent.get(`${API_URL}/api/login`);
        })
        .catch((res) => {
          expect(res.status).toEqual(401);
        });
    });
  });
});
