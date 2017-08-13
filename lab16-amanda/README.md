express basic authorization
======

## Features
This project includes a package.json that lists all dependencies and developer dependencies which include:
* .eslintrc
* .env and .test.env file
* .gitignore

## Organization
* The code is organized in these directories:
* db - use the command `mongod --dbpath ./db` to start mongod using this directory
* lib
* model
* route
* test
* HTTP Server using `express`
* http-errors` npm module with`error-response` middleware

## User Model
* Mongoose with the properties `username`, `password`, and `findHash`
 * The user must have a unique username and tokenSeed
 * the user must have an email
 * The user must never store the password as plain text (hash the password)
 * The user must have a method for generating a token from the findHash
* Create a Basic Auth Middleware for parsing basic auth headers
* use the `body-parser` express middleware to on `POST` and `PUT` routes
* using the express `Router` create an auth router with routes for **signup** and **signin** -->

## Server Endpoints
* `/api/signup`
* `POST` request
* the client should pass the username and password in the body of the request
* the server should respond with a token generated using jsonwebtoken and the users findHash
* the server should respond with a 400 Bad Request to failed request

### `/api/signin`
* `GET` request
 * the client should pass the username and password to the server using a _Basic_ auth header
 * the server should respond with a token to authenticated users
 * the server should respond with a 401 Unauthorized to non authenticated users

## Tests
* The user starts the server when they begin and stop the server when they finish
* Tests ensures that the api returns a status code of 404 for routes that have not been registered
* `/api/signup`
* `POST` - test 400, responds with the `http-errors` 400 name, for if no `body provided` or `invalid body`
* `POST` - test 200, response body like `<token>` for a post request with a valid body -->
* `/api/signin`
* `GET` - test 401, responds with the `http-errors` 401 name, if the users could not be authenticated
* `GET` - test 200, response body like `<token>` for a request with a valid basic auth header
