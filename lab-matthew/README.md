# Sign Up / Log In

This API lets a user create a new user account consisting of a username and password, utilizing cryptography and hashing to keep the password secure, and lets a user upload a map object.

## To use

Make a post request to the server with username and password key value pairs in the body to create a User.

To upload a map object, make a post request with the following key/value pairs:

- title: 'title here'
- hint: 'hint here'
- image: 'filepath on your computer of image to upload'
