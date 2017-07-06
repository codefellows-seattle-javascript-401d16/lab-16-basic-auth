'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const clearDB = require('./lib/clearDB.js');
const mockUser = require('./lib/mock-user.js');
const faker = require('faker');

const API_URL = process.env.API_URL;

describe('testing postRouter', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST at /api/posts', () => {
    it('should respond with post body and 200 status', () => {
      let companyName = faker.company.companyName();
      let caption = faker.company.catchPhrase();
      let tempUser;
      return mockUser.createOne()
        .then((userData) => {
          tempUser = userData;
          return superagent.post(`${API_URL}/api/posts`)
            .set('Authorization', `Bearer ${userData.token}`)
            .field('title', companyName)
            .field('caption', caption)
            .attach('image', `${__dirname}/testing-assets/data.jpg`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual(companyName);
          expect(res.body.caption).toEqual(caption);
          expect(res.body.userID).toEqual(tempUser.user._id);
          expect(res.body.imageURI).toExist();
        });
    });
    it('should respond with 401 due to missing Bearer token', () => {
      let companyName = faker.company.companyName();
      let caption = faker.company.catchPhrase();
      return mockUser.createOne()
        .then((userData) => {
          return superagent.post(`${API_URL}/api/posts`)
            .set('Authorization', `Bearer `)
            .field('title', companyName)
            .field('caption', caption)
            .attach('image', `${__dirname}/testing-assets/data.jpg`);
        })
        .catch((res) => {
          expect(res.status).toEqual(401);
        });
    });
    it('should respond with 400 due to missing title', () => {
      let caption = faker.company.catchPhrase();
      return mockUser.createOne()
        .then((userData) => {
          return superagent.post(`${API_URL}/api/posts`)
            .set('Authorization', `Bearer ${userData.token}`)
            .field('caption', caption)
            .attach('image', `${__dirname}/testing-assets/data.jpg`);
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
  });
});
