## Lab-Steve Lab-16 Documentation

MODIFY FOR LAB-16

### This app functions as a data store for beers and their basic characteristics that uses a RESTful API for data storage, display, and manipulation.

  * Installation:
    * Install Node.JS: `sudo apt-get install node`
    * Clone this repository: `git clone https://github.com/0smium/lab-13-single-mongo-resource.git`
    * Navigate to the newly created 'lab-13-single-mongo-resource' folder
    * Navigate to the the 'lab-steve' directory
    * Install all node dependencies for the project: `npm-install-all`
    * Use:
      * Create a `.env` file with the following content or similar:
        * PORT=3000
        * MONGODB_URI='mongodb://localhost/beers-db'
      * `npm run start-db &` (this may take some time on first run)
      * `npm start`
      * Install HTTPie: `sudo apt-get install httpie`
      * Usage: `http <method> localhost:<port from .env>/api/beers...` using the examples below.
      * When done, in the server terminal window, type `ctrl+c` to end the server.
      * `npm run stop-db`

  * index.js employs 'dotenv', imports lib/server.js, and calls a server start script from server.js using the environmental port variable (3000).
  * lib/server.js defines the connection to the database using MongooseJS, sets up the server using Express, and requires route/beer-router.js, which defines all routes for the single-resource API.
    * The CORS module allows the API to be CORS-enabled for all origins.
    * The morgan module, in its simplest implementation, logs response codes, response times, and content-length for all HTTP requests.
  * model/beers.js defines the beer constructor and implements basic validation to prevent duplicate names.
  * The following methods will return the following results:
    * `GET localhost:3000/api/beers` - without a valid ID returns status code 200 and an array of all of the records for that resource.
    * **STRETCH GOAL** `GET localhost:3000/api/beers?page=n` - where each page includes 50 records for the resource and n represents the page number, returns status code 200 and an array of up to 50 records for that resource.
    * `GET localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx` (hexadecimal) - returns status code 200 and a beer object matching a valid ID.
    * `GET localhost:3000/api/beers/12345` - returns a 404 error code and the details of the error if a valid ID is not included.
    * `POST localhost:3000/api/beers` - returns a 400 error code and the details of the error.
    * `POST localhost:3000/api/beers name=<name of the beer> type=<type of beer i.e., IPA, Kolsch...> - returns status code 201 and a new beer object for a POST request with a valid body.
    * `PUT localhost:3000/api/beers` - returns a 404 error code and the details of the error if a valid ID is not included.
    * `PUT localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx` - returns a 400 error code and the details of the error.
    * `PUT localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx name=<STRING> type=<STRING> - returns status code 202 an updated beer object for PUT request with valid ID and ANY NUMBER of parameters that should be changed, for instance, `PUT localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx type='new type'`.
    * `DELETE localhost:3000/api/beers` - returns a 204 status code and deletes all records for the resource.
    * `DELETE localhost:3000/api/beers?id=1` - returns 404 error code and and the details of the error for valid DELETE request made with an ID that was not found.
    * `DELETE localhost:3000/api/beers/xxxxxxxxxxxxxxxxxxxxxxxx` - returns  204 status code for a DELETE request with a valid ID.
  * Tests - Mocha spins up the server before all tests and spins it down afterwards and tests the routes in route/beer-router.js using Expect, while clearing the DB after each test.
    1. `POST localhost:3000/api/beers` uses the 'faker' NPM module to pass in a fake name and type - should return 201 status code and an object with name and use properties matching the fake data passed in and tests all the other parameters.  'res.body' is then assigned to the 'tempBeer' variable, which is used in the remainder of the tests.
    2. `POST localhost:3000/api/beers` - should return a 400 error code for a POST request with no body.
    3. `POST localhost:3000/api/beers/${tempBeer._id}` and passes in tempBeer as the request body - should return a 409 error code for a valid POST request that has a name parameter that already exists for another object in the DB.
    4. `GET localhost:3000/api/beers/${tempBeer._id}` - should return a 200 status code and tempBeer data for the specific ID.
    5. `GET localhost:3000/api/beers` - should return a 200 status code and an array of beer IDs.
    6. `GET localhost:3000/api/beers/12345` - should return 404 error code for GET request without a valid ID.
    7. `PUT localhost:3000/api/beers/${tempBeer._id}` - passing in `{name: 'Space Dust', type: 'IPA'}` should return a 202 status code for valid PUT request with the specific ID with name changed to 'Space Dust' and type changed to 'IPA'.
    8. `PUT localhost:3000/api/beers/${tempBeer._id}` - with no body should return 400 error code.
    9. `PUT localhost:3000/api/beers/12345` - should return 404 error code for PUT request without a valid ID and not delete anything.
    10. `DELETE localhost:3000/api/beers/${tempBeer._id}` - should return 204 status code and DELETE the record matching the ID.
  * Project passes esLint.
  * NPM Scripts:
    * "test": "mocha" - Runs test scripts.
    * "lint": "eslint ." - Runs esLint on all scripts.
    * "watch": "nodemon index.js" - Runs NodeMon to start the server and watch for changes.
    * "start": "node index.js" - Starts the server.
    * "start-db": "mkdir -p ./db && mongod -dbpath ./db &" - Starts MongoDB daemon.
    * "stop-db": "killall mongod" - Stops MongoDB daemon.
