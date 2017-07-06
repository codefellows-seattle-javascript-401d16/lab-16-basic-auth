'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('Authentication Router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('GET non existent route', () => {
    return superagent.get(`${API_URL}/api/laskdasd`)
      .then(res => {
        throw res;
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
  });

  describe('POST /api/signup', () => {
    it('Should respond with a token (post)', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: 'tester',
          password: 'secret',
          email: 'testermail@mail.test',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('Should respond 400 bad request', () => {
      return superagent.post(`${API_URL}/api/signup`)
        .send({
          username: 'asdads',
          password: 'asdadasda',
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(400);
          expect(res.body).toNotExist();
        });
    });
  });

  describe('GET /api/signin', () => {
    it('Should respond with a token (get)', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64');
          return superagent.get(`${API_URL}/api/signin`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.text).toExist();
          expect(res.text.length > 1).toBeTruthy();
        });
    });
    it('Should respond 401 unauthorized', () => {
      let tempUser;
      return mockUser.createOne()
        .then(userData => {
          tempUser = userData.user;
          let encoded = new Buffer(`${tempUser.username}:wrongPASS`).toString('base64');
          return superagent.get(`${API_URL}/api/signin`)
            .set('Authorization', `Basic ${encoded}`);
        })
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });
  });
});
