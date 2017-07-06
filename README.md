![cf](https://i.imgur.com/7v5ASc8.png) lab 16 express basic authorization
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies DONE
* include an .eslintrc DONE
* use a .env and .test.env file **but do not include it** DONE
* include a .gitignore DONE
 * **add the string `db` to your gitignore** DONE
 * **add the string `node_modules` to your gitignore** DONE
 * **add the string `.env` to your gitignore** DONE
 * **add the string `.test.env` to your gitignore** DONE

* include a readme with a project description and route docs DONE

# Directions
* Create these directories to organize your code:
 * db - use the command `mongod --dbpath ./db` to start mongod using this directory
 * lib DONE
 * model DONE
 * route DONE
 * test DONE
* Create a HTTP Server using `express` DONE
* Use the `http-errors` npm  module with the new`error-response` middleware from lecture DONE
* Create a **User Model** using mongoose with the properties `username`, `password`, and `findHash` DONE
 * The user must have a unique username and tokenSeed DONE
 * the user must have an email DONE
 * The user must never store the password as plain text (hash the password) DONE
 * The user must have a method for generating a token from the findHash DONE
* Create a Basic Auth Middleware for parsing basic auth headers
* use the `body-parser` express middleware to on `POST` and `PUT` routes
* using the express `Router` create an auth router with routes for **signup** and **signin**

## Server Endpoints
### `/api/signup`
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
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* `/api/signup`
 * `POST` - test 400, responds with the `http-errors` 401 name, for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like `<token>` for a post request with a valid body
* `/api/signin`
 * `GET` - test 401, responds with the `http-errors` 401 name, if the users could not be authenticated DONE
 * `GET` - test 200, response body like `<token>` for a request with a valid basic auth header DONE
