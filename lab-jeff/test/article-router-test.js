'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing article router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/articles', () => {
    it('should respond with an article', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/articles`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'test title')
        .field('content', 'test content')
        .attach('file', `${__dirname}/assets/testfile.webp`);
      })
      .then(res => {
        console.log('res.body', res.body);
        expect(res.status).toEqual(200);
        expect(res.body.content).toEqual('test content');
        expect(res.body.title).toEqual('test title');
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.photoURI).toExist();
      });
    });
    it('should respond with a 400 status code', () => {
      let tempUserData ;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/resource`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'test title')
        .field('content', 'test content');
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    it('Should respond with a 401 status code', () => {
      let tempUser;
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        let encoded = new Buffer(`${tempUser.username}:sup`).toString('base64');
        return superagent.post(`${API_URL}/api/resource`)
        .set(`Authorization`, `Basic ${encoded}`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });
});
