# NodeExpressAuthWithToken

This is a repository that contains an implementation of authentication necessary in express applications using jsonwebtokens. To use this repository, copy the below files.

The necessary files are
- 'routes/user.js': has 4 routes
    - Login: checks for a user with email and password and generates token if successful
    - Logout: logs out the user by deleting the token
    - LogoutAll: logs out the user for all devices by deleting all tokens
    - Register: registers a new unique email Id and a password
- 'models/User.js': defines a model for User
    - Fields included are email(unique), password and token
    - 
- 'utils/middleware.js': has a middleware
    - 'authenticated' which checks the token in the request header and returns user object if valid
- 'utils/password.js': has methods that aid password operations
    - 'hash' method which generates a hash
    - 'verify' method which verifies a given password with hash stored in db
- 'utils/token.js': has 2 methods 
    - 'generate' to generate a token based on data passed
    - 'verify' which decodes the token and returns the user object associated
- 'utils/connect.js': connects to mongodb before other operation can be performed
    - check if this can be removed if necessary.

## How to use this
1. Intall the below npm packages
    - validator
    - jsonwebtoken
    - bcrypt
    - mongoose
    - express
2. [Set environment variables for DB, SecretKey]
3. Copy files in 'routes', 'models' and 'utils' to respective folder
4. Import 'routes/user.js' into 'app.js' and use the route appropriately

## ToDo
[ ] Add environment variables support
[ ] Generate auth token immediately after register to prevent additional login