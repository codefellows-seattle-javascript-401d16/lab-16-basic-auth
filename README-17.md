![cf](http://i.imgur.com/7v5ASc8.png) 17: Bearer Auth and S3 upload
=====================================

# Description
* continueing from lab 16
* Add a s3 Upload middleware DONE
* Add a bearer auth middleware DONE
* Create a new resouce that will have an associated file asset DONE
   * This must be different from the article model in class OK
  * Create a `/api/resource` post route for this model DONE
  * The model most inculde a userID DONE
  * The model must include a uri for the location of your file asset on S3 DONE

# Test
* Test 200, 400, and 401 for your `post /api/resource`  DONE

# Bonus 2pts
* Ensure that when your model gets deleted from the database it removes its file from s3 as well
