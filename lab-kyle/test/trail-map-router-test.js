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
        .set('authorization',`Bearer ${tempUserData.token}`)
        .field('name', 'Green Mountain')
        .field('description', 'cool shit')
        .attach('image', `${__dirname}/assets/green-mtn.jpg`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.name).toEqual('Green Mountain');
        expect(res.body.description).toEqual('cool shit');
        expect(res.body.mapURI).toExist();
      });
    });

    it('should respond with a 400', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/trailMaps`)
        .set('authorization',`Bearer ${tempUserData.token}`)
        .field('description', 'cool shit')
        .attach('image', `${__dirname}/assets/green-mtn.jpg`);
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    it('should respond with a 401', () => {
      let tempUserData; // delete this
      return mockUser.createOne()
      .then(userData => { // and the params
        tempUserData = userData; // and this
        return superagent.post(`${API_URL}/api/trailMaps`)
        .set('authorization',`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiIwN2YxMDZhMThkNzIyY2Y5ZWM0ODAzMmEwYWFiZDQyMjkwOTQ4OTc0NjgzMWNkNTdmNzJjNGU1NDYwOWIyYjE0IiwiaWF0IjoxNDk5Mjk2ODc0fQ.BFi83M3-3uxdNjHGD68SnC26MMd0fs9_4q6XD5CxpTw`) // sort this shit out, it's a fucking mess.
        .field('name', 'Green Mountain')
        .field('description', 'cool shit')
        .attach('image', `${__dirname}/assets/green-mtn.jpg`);
      })
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    });

    it('should respond with a 400', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/notTrailMaps`)
        .set('authorization',`Bearer ${tempUserData.token}`)
        .field('description', 'cool shit')
        .attach('image', `${__dirname}/assets/green-mtn.jpg`);
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
