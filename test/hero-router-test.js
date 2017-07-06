'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const cleardb = require('./lib/cleardb.js');
const mockUser = require('./lib/mockUser.js');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Testing hero routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleardb);

  describe('Testing POST requests for Hero resources', () => {
    it('Should upload an image and return a status of 200', () => {
      let tempUserInfo;
      return mockUser.createOne()
      .then(userInfo => {
        tempUserInfo = userInfo;
        return superagent.post(`${API_URL}/api/heroes`)
        .set('Authorization', `Bearer ${tempUserInfo.token}`)
        .field('title', 'thrall')
        .attach('image', `${__dirname}/assets/thrall.jpg`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('thrall');
        expect(res.body.userID).toEqual(tempUserInfo.user._id.toString());
        expect(res.body.imageURI).toExist();
      });
    });
    it('Should return status of 400', () => {
      let tempUserInfo;
      return mockUser.createOne()
      .then(userInfo => {
        tempUserInfo = userInfo;
        return superagent.post(`${API_URL}/api/heroes`)
        .set('Authorization', `Bearer ${tempUserInfo.token}`);
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('Should return status of 400', () => {
      let tempUserInfo;
      return mockUser.createOne()
      .then(userInfo => {
        tempUserInfo = userInfo;
        return superagent.post(`${API_URL}/api/heroes`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });
  });
});
