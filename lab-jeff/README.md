## **Description**

This application allows the users to create accounts using basic authentication.

Requirement

  mongodb
  node

Installation

  1. Clone the repo
  2. Run npm install
  3. Create a .env variable which includes the following
      PORT=3000
      MONGODB_URL='mongodb://localhost/'
      API_URL='http://localhost'
      APP_SECRET='xxxxxxxxxxxxxxxxxxxxx' random string used to create a token
  4. Run 'npm run start-db' if running a local db
  5. Run 'node index.js'


Routes

POST

/api/signup

Creates a user object object
Pass the following in the body
{
  username: 'myUsername',
  password: 'myPassword',
  email: 'myEmail@wattttt.com',
}
returns a token


GET

/api/login

Creates a token for an existing user

Pass the the username and password in the Authorization Header
  'Basic username:password'

returns a token
