# Sign Up and Sign In REST API  

## Install  
- To install my API you can do so by cloning this repo:  
```
git clone https://github.com/SpenGietz/lab-16-basic-auth.git
```
- To add this to your own project:  
```
npm i -S lab16-spencer
```
- After installation, you need to make sure that you have both a ".env" and a ".test.env" file in the home directory to handle the environment variables in the following format:  
```
PORT=3000
MONGODB_URI='mongodb://localhost/dev'
API_URL='http://localhost:3000'
APP_SECRET='app secret string'
```
```
PORT=7000
MONGODB_URI='mongodb://localhost/test'
API_URL='http://localhost:7000'
APP_SECRET='app secret test string'
```

## Commands  

### npm run start-db  
- This will start the database that is required by the API  

### npm run stop-db  
- This will stop the database when you are done  

### npm lint  
- This will run your linter through this modules code  

### npm test  
- This will run all of the tests I've written to confirm everything is working properly  

### npm start  
- This will run the server and it will be ready for API requests  

## Routes  

### /api/signup  
- This route accepts POST requests

#### POST  
- You can sign up through the server by posting data in the following format:  
```
{
  username: 'tester',
  password: 'secret',
  email: 'testermail@mail.test',
}
```

### /api/signin  
- This route accepts GET requests

#### GET
- You can request a signin by sending a GET request to this route with your authorization headers set to the base 64 encoding of username:password

### /api/*  
- Any other route will respond with a 404  
