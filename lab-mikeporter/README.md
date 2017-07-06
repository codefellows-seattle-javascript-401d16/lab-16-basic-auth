#documentation lab 16

This lab includes a signup feature, whereby a user sends an email, password and username and receives a token for being logged in. The password is hashed and is used comparatively for login attempts.(The token isn't implemented yet)

This lab also includes a login feature, whereby a user sends their username and password and we match it to the hashed password we have in the database.

#post /api/signup
Users can signup by sending an email, password and username in a post request body. If valid, this request goes to the post /api/signup route, where it gets json parsed and passed to a function where user.create is called. This function removes the password property after assigning it to a variable. That variable is then called as an argument to the function passwordHashCreate which creates a hash of the password with bcrypt and saves it as the password property. The data is passed and tokenSeedCreate is called to generate a tokenseed using jsonwebtoken and our app_secret. Our data is saved to the database inside tokenSeedCreate and the tokenseed is passed in the body.

Invalid requests that don't include the body or don't include a username, password and email receive a 401 status.

#get /api/login
Users can login by sending their username and password in the body of a get request. This data goes to the get /api/login route and passes through the basic Auth middleware. In the basic auth middleware we check if the authorization header exists, if the encoded value in the authorization header exists and after removing the base64 encoding we check that a username and password both exist.

We then take the username, search the database for the username and call passwordHashCompare to hash the password we received and compare it to the stored hash password. If the compare passes, our user is authenticated and we generate a tokenseed which we save and respond with in the body.

Invalid get requests don't include the authorization header, the encoded values, or inappropriate usernames/passwords and respond with a res.status of 401 unauthorized.
