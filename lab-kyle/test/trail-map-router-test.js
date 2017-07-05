'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing trail map router', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/trailMaps', () => {
    it('should respond with a trail map', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/trailMaps`)
        .set('authorization', 'Bearer ${tempUserData.token}')
        .field('name', 'Green Mountain')
        .field('description', 'cool shit')
        .attach('mapURI', `${__dirname}/assets/green-mtn.jpg`);
      })
      .then(res => {
        console.log('res.body', res.body);

        expect(res.status).toEqual(200);
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.name).toEqual('Green Mountain');
        expect(res.body.description).toEqual('cool shit');
        expect(res.body.mapURI).toExist();
      });
    });
  });
});
