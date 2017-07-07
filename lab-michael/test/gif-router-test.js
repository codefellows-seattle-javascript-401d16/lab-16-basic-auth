'use strict';

// load env
require('dotenv').config({path: `${__dirname}/.test.env`});

// require npm modules
const expect = require('expect');
const superagent = require('superagent');

// require app modules
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

// const API_URL = process.env.API_URL;
let API_URL=`http://localhost:${process.env.PORT}`;

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing the post /api/giphies', () => {
    it('should be posting a gif to aws', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        console.log('tempUserData^^^^',tempUserData);
        return superagent.post(`${API_URL}/api/giphies`)
      .set('Authorization',`Bearer ${tempUserData.token}`)
      .field('title','alwaysSunnyPhoto')
      .field('description','funny dancing gif')
      .field('category','comedy')
      .attach('image', `${__dirname}/assets/duncan.jpg`);
      })
    .then(res => {
      console.log('res.status...',res.status);
      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual('alwaysSunnyPhoto');
      expect(res.body.description).toEqual('funny dancing gif');
      expect(res.body.userID).toEqual(tempUserData.user._id.toString());
      expect(res.body.gifURI).toExist();
    });
    });
  });
});
