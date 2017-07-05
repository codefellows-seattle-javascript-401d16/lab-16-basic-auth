require('dotenv').config({ path: `${__dirname}/.env`});
const expect = require('expect');
const superagent = require('superagent');
const User = require('../model/user');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}/api`;

describe('server', () => {

  before(() => {
    return server.start()
      .then(() => User.remove({}));
  });

  after(() => {
    return User.remove({})
      .then(() => server.stop());
  });

  const testUser = {
    username: 'yancy',
    email: 'yancy@yancy.com',
    password: 'hunter2',
  };

  it('should respond 200 with a token for good signup', () => {
    return superagent.post(`${API_URL}/signup`)
      .send(testUser)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.text).toExist();
      });
  });

  it('should respond 400 to a bad signup', () => {
    return superagent.post(`${API_URL}/signup`)
      .send({})
      .catch(err => {
        expect(err.status).toEqual(400);
      });
  });

  it('should respond 200 to good signin', () => {
    const encodedBasicAuth = new Buffer(`${testUser.username}:${testUser.password}`).toString('base64');
    return superagent.get(`${API_URL}/signin`)
      .set('Authorization', `Basic ${encodedBasicAuth}`)
      .then(res => {
        expect(res.status).toEqual(200);
        testUser.token = res.text;
      });
  });

  it('should respond 401 to bad signin', () => {
    const badBasicAuth = new Buffer('nobody:nothing').toString('base64');
    return superagent.get(`${API_URL}/signin`)
      .set('Authorization', `Basic ${badBasicAuth}`)
      .catch(err => expect(err.status).toEqual(401));
  });

  it('should respond 200 with data to a correct new ferret', () => {
    return superagent.post(`${API_URL}/ferrets`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .field('name', 'Muffin')
      .attach('image', `${__dirname}/assets/pic.jpg`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Muffin');
        expect(res.body.photoURI).toExist();
        console.log('Photo: ', res.body.photoURI);
      });
  });

  it('should respond 400 to a bad request for new ferret', () => {
    return superagent.post(`${API_URL}/ferrets`)
      .set('Authorization', `Bearer ${testUser.token}`)
      .field('fluffy', 'yes')
      .catch(err => {
        expect(err.status).toEqual(400);
      });
  });

  it('should respond 401 to an unauthorized request for new ferret', () => {
    return superagent.post(`${API_URL}/ferrets`)
      .set('Authorization', 'BEERer laaaaaaaaaaaaaaaa')
      .send()
      .catch(err => {
        expect(err.status).toEqual(401);
      });
  });

});
