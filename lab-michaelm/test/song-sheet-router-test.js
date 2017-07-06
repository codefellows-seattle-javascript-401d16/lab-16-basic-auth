'use strict';

// load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

// require npm modules;
const expect = require('expect');
const superagent = require('superagent');

// require app modules
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockUser = require('./model/mock-user.js');

const API_URL = process.env.API_URL;

describe('---------------------Testing song-sheet router---------------------', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/song-sheet', () => {
    it.only('should respond with a song sheet', () => {
      let tempUserData ;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/songsheet`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'example title')
        .field('content', 'cool beans')
        .attach('image', `${__dirname}/assets/homer.mp4`);
      })
      .then(res => {
        console.log('res.body', res);
        expect(res.status).toEqual(200);
        expect(res.body.content).toEqual('cool beans');
        expect(res.body.title).toEqual('example title');
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.profilePictureURI).toExist();
      });
    });
  });

});
