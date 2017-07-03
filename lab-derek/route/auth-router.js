

// /api/signup
//
// POST request
// the client should pass the username and password in the body of the request
// the server should respond with a token generated using jsonwebtoken and the users findHash
// the server should respond with a 400 Bad Request to failed request



// /api/signin
//
// GET request
// the client should pass the username and password to the server using a Basic auth header
// the server should respond with a token to authenticated users
// the server should respond with a 401 Unauthorized to non authenticated users
