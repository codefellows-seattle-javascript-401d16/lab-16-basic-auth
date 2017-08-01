

# Desecription

* Users can now create their own profile with a username, email and password
* when a user goes to /api/sigunup, they can create a profile and set a password which will
  hash it for comparison on future logins
* by going to /api/signin, the users can use their previous password to log int to their profile.
* For each request, regardless of what it is, the user will be assigned a token for verification purposes.
