# README.md - Lab 16, Express Basic authorization

## POST /api/signup

Allows user to provide a basic authorization over http in the form of an encoded username:password string in Base64. API will create a new user with associated passwordHash for future authentication and will respond to client with a newly created token. If either username or password are invalid, API will respond with status code 401.

## GET /api/signin

Allows user to sign in using their username and password over http in the form of encoded username:password string in Base64. API will respond with newly created token. If username or password are invalid, API will repsond with status code 401. 
