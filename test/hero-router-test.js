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
    it.only('Should upload an image and return a status of 200', () => {
      let tempUserInfo;
      return mockUser.createOne()
      .then(userInfo => {
        tempUserInfo = userInfo;
        return superagent.post(`${API_URL}/api/upload`)
        .set('Authorization', `Bearer ${tempUserInfo.token}`)
        .field('title', 'Thrall')
        .attach('image', `${__dirname}/assets/thrall.jpg`);
      })
      .then(res => {
        console.log('Test', res.body);
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('Thrall');
        expect(res.body.userID).toEqual(tempUserInfo.user._id.toString());
        expect(res.body.imageURI).toExist();
      });
    });
  });
});
