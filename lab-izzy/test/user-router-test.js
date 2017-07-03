'use strict';

// test 404 for routes that have not been registered
// test POST 400 respond with http-errors 401 name, for if no body provided or invalid body
// test POST 200 response body like <token> for a post request with a valid body
// test GET 401 responds with http-errors 401 name, if the users could not be authenticated
// test GET 200 response body like <token> for a request with a valid basic auth header
