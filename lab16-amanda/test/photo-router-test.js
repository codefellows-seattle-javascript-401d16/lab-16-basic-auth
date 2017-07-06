'use strict';

// load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

// module.exports = (req, res, next) => {
//   const {authorization} = req.headers;
//
//   if(!authorization)
//     return next(new Error('unauthorized no authorization provided'));
//
//   let encoded = authorization.split('Basic ')[1]
//   if(!encoded);
// };
// require npm modules
const expect = require('expect');
const superagent = require('superagent');

// require app modules
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing photo router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/photos', () => {
    it('should respond with an photo', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/photos`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'example title')
        .field('content', 'cool beans')
        .attach('image', `${__dirname}/assets/data.png`);
      })
      .then(res => {
        console.log('res.body', res.body);
        expect(res.status).toEqual(200);
        expect(res.body.content).toEqual('cool beans');
        expect(res.body.title).toEqual('example title');
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.photoURI).toExist();
      });
    });
    it('should respond with a 401', () => {
      return superagent.post(`${API_URL}/api/photos`)
      .send()
      .catch(err => {
        expect(err.status).toEqual(401);
      });
    });
    it('should respond with a 400', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/photos`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .catch(err => {
          expect(err.status).toEqual(400);
        });
      });
    });
  });
});
