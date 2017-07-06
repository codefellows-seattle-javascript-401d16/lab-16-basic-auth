'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

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
      return mockUser.createOne()
        .then((userData) => {
          return superagent.post(`${API_URL}/api/articles`)
            .set('Authorization', `Bearer ${userData.token}`)
            .field('title', faker.company.companyName())
            .field('caption', faker.company.catchPhrase())
            .attach('jpeg', `${__dirname}/assets/data.jpg`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toExist();
          expect(res.body.caption).toExist();
          expect(res.body.userId).toExist();
          expect(res.body.jpegURI).toExist();
        });
    });
  });
});
