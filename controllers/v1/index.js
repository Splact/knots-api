'use strict';

/// Meta info
// version:    1;

/// Load Core and Third-party modules
var apiRouter = require('express').Router(); // get an instance of the express Router

/// Load Sub-routes
//var utilityRouter = require('./utility-router');
var authRouter    = require('./auth.router');
var userRouter    = require('./user.router');
var searchRouter  = require('./search.router/index.js');

/// Api routes
//apiRouter.use('/', utilityRouter);
//apiRouter.use('*', AuthController.requireApiKey);
apiRouter.use('/', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/search', searchRouter);

module.exports = apiRouter;
