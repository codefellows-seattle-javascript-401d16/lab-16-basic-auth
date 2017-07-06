'use strict';

//load env
require('dotenv').config({path: `${__dirname}/../.test.env`});

//npm modules

const expect = require('expect');
const superagent = require('superagent');

//app modules

const server = require('../lib/server.js');
const cleanDB = require('./lib/clean-db.js');
const mockUser = require('./lib/mock-user.js');

const API_URL = process.env.API_URL;

describe('testing pdf router', () => {
  before(server.start);
  after(server.stop);
  afterEach(cleanDB);

  describe('testing POST /api/pdfs', () => {
    it('should respond with a pdf', () => {
      let tempUserData;
      return mockUser.createOne()
      .then(userData => {
        tempUserData = userData;
        return superagent.post(`${API_URL}/api/pdfs`)
        .set('Authorization', `Bearer ${tempUserData.token}`)
        .field('title', 'example title')
        .field('tag', 'example tag')
        .attach('pdf', `${__dirname}/assets/testfile.pdf`);
      })
      .then(res => {
        expect(res.body.title).toEqual('example title');
        expect(res.body.tag).toEqual('example tag');
        expect(res.body.userID).toEqual(tempUserData.user._id.toString());
        expect(res.body.pdfURI).toExist();
      });
    });
  });
});//close final describe block
