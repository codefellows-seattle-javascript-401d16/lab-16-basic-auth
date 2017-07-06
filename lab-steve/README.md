## Lab-Steve Lab-17 Documentation

### This app functions as a basic user registration and login tool that uses a RESTful API for user signup, login, and sending photos to AWS S3.

  * Installation:
    * Install Node.JS: `sudo apt-get install node`
    * Clone this repository: `git clone https://github.com/0smium/lab-16-basic-auth.git`
    * Navigate to the newly created 'lab-16-basic-auth' folder
    * Change to the right branch: `git checkout lab-17`
    * Navigate to the the 'lab-steve' directory
    * Install all node dependencies for the project: `npm-install-all`
    * Use:
      * Create a `.env` file with the following content or similar:
        * PORT=3000
        * MONGODB_URI='mongodb://localhost/user-db'
        * APP_SECRET='<your own random string>'
        * AWS_BUCKET='<your s3 bucket>'
        * AWS_ACCESS_KEY_ID='<your AWS Access Key ID>'
        * AWS_SECRET_ACCESS_KEY='<your AWS Secret Access Key>'
      * `npm run start-db &` (this may take some time on first run)
      * `npm start`
      * Install HTTPie: `sudo apt-get install httpie`
      * Usage: `http <method> localhost:<port from .env>/api/signup` **OR** `http <method> localhost:<port from .env>/api/login` using the examples below.
      * When done, in the server terminal window, type `ctrl+c` to end the server.
      * `npm run stop-db`

  * index.js employs 'dotenv', imports lib/server.js, and calls a server start script from server.js using the environmental port variable (3000).
  * lib/server.js defines the connection to the database using MongooseJS, sets up the server using Express, and requires route/auth-router.js, which defines all routes for the API.
    * The CORS module allows the API to be CORS-enabled for all origins.
    * The morgan module, in its simplest implementation, logs response codes, response times, and content-length for all HTTP requests.
  * model/user.js defines the user constructor and implements basic validation to prevent duplicates.  
    * The following three modules are required besides mongoose:
      1. bycrypt (NPM module for hashing passwords)
      2. jsonwebtoken (NPM module for encrypting tokenSeed to create token)
      3. crypto (Node module for getting random string to be a tokenSeed)
    * Four methods are created on the constructor:
      1. passwordHashCreate
      2. passwordHashCompare
      3. tokenSeedCreate
      4. tokenCreate
  * route/photo-router.js defines the POST route for uploading photos to S3.  It employs S3 and bearer-auth middleware as well as the photo model.
  * model/photo.js defines the photo constructor.
  * The following methods will return the following results:
    * `POST localhost:3000/bad/route` **OR** `GET localhost:3000/bad/route` - returns a status code of 404.
    * `POST localhost:3000/api/signup` - returns a 400 status code for a missing body.
    * `POST localhost:3000/api/signup username=<username>` - returns a 400 status code for an incomplete body.
    * `POST localhost:3000/api/signup username=<username> password=<password> email=<email address>` - returns a 200 status code and a token.
    * `GET localhost:3000/api/signin` **OR** `GET <badUserInfo>@localhost:3000/api/signin` - returns a 401 status code.
    * `GET <username>:<password>@localhost:3000/api/signin` - returns a 200 status code and a token.
    * `POST localhost:3000/api/photos` while setting a bearer token as the 'Authorization' header, assigning the fields 'title' and 'content', and attaching a photo - returns a 200 status code, uploads a photo to S3, and returns an S3 metadata object.
    * `POST localhost:3000/api/photos` with a proper bearer token, but without fields and a an attachment  - returns a 400 status code.
    * `POST localhost:3000/api/photos` with fields and a an attachment, but without a bearer token - returns a 401 status code.
  * Tests - Mocha spins up the server before all tests and spins it down afterwards and tests the routes in route/beer-router.js using Expect, while clearing the DB after each test.
    1. POST or GET against any non-existent route - should return a 404 status code.
    2. `POST localhost:3000/api/signup` sends demo username, password, and email address - should return a 200 status code and a token.
    3. `POST localhost:3000/api/signup` without a body or an incomplete body - should return a 400 status code.
    4. `GET localhost:3000/api/login` with a non-existent username - should return a 401 status code.
    5. `GET localhost:3000/api/login` with pre-created 'faker' generated user information - should return a 200 status code and a token.
    6. `POST localhost:3000/api/photos` while setting a bearer token as the 'Authorization' header, assigning the fields 'title' and 'content', and attaching a photo - should return a 200 status code, upload a photo to S3, and return an S3 metadata object.
    7. `POST localhost:3000/api/photos` with a proper bearer token, but without fields and a an attachment  - should return a 400 status code.
    8. `POST localhost:3000/api/photos` with fields and a an attachment, but without a bearer token - should return a 401 status code.
  * Project passes esLint.
  * NPM Scripts:
    * "test": "mocha" - Runs test scripts.
    * "lint": "eslint ." - Runs esLint on all scripts.
    * "watch": "nodemon index.js" - Runs NodeMon to start the server and watch for changes.
    * "start": "node index.js" - Starts the server.
    * "start-db": "mkdir -p ./db && mongod -dbpath ./db &" - Starts MongoDB daemon.
    * "stop-db": "killall mongod" - Stops MongoDB daemon.
