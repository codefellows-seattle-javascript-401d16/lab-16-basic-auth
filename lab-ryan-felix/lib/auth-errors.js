'use strict';

class AuthorizationError extends Error {
  constructor(err) {
    console.log(`AUTHORIZATION ERROR: ${err}`);
    super(err);
  }
}

class BadRequestError extends Error {
  constructor(err) {
    console.log(`BAD REQUEST ERROR: ${err}`);
    super(err);
  }
}

class ServerError extends Error {
  constructor(err) {
    console.log(`SERVER ERROR: ${err}`);
    super(err);
  }
}

module.exports = { AuthorizationError, BadRequestError, ServerError };
