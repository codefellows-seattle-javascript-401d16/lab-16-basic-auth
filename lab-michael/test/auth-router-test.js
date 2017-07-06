'use strict';

// load test env
require('dotenv').config({path: `${__dirname}/../.test.env`});

// load npm modules
const expect = require('expect');
const superagent = require('superagent');

// load app modules
const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

let API_URL=`http://localhost:${process.env.PORT}`;

describe('testing auth router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/signup', () => {
    it('should respond with a token', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({
        username: 'test_user',
        password: 'top secret',
        email: 'test_user@example.lulwat',
      })
      .then(res => {
        console.log("token we got back ", res.text);
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
        expect(res.text.length > 1).toBeTruthy();
      })
    })

    it.only('should respond without a body... seeing the error', () => {
      return superagent.post(`${API_URL}/api/signup`)
      .send({})
      .then(res => {throw res})
      .catch(res => {
        expect(res.status).toEqual(401);
      });
    })
  })

  describe('testing GET /api/login', () => {
    it('should respond with a token', () => {
      let tempUser
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user
        console.log('tempUser', tempUser)
        let encoded = new Buffer(`${tempUser.username}:${userData.password}`).toString('base64')
        return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${encoded}`)
      })
      .then(res => {
        console.log("token we go back ", res.text)
        expect(res.status).toEqual(200)
        expect(res.text).toExist()
        expect(res.text.length > 1).toBeTruthy()
      })
    })
    it('should respond with a 401 error!', () => {
      let tempUser
      return mockUser.createOne()
      .then(userData => {
        tempUser = userData.user;
        console.log('401 error testing tempUser', tempUser);
        let encoded = new Buffer(`${tempUser.username}:wrongpasswordddd`).toString('base64')
        return superagent.get(`${API_URL}/api/login`)
        .set('Authorization', `Basic ${encoded}`)
      })
      .then(res => {throw res})
      .catch(res => {
        expect(res.status).toEqual(401);
      });
      })

    })
  });
