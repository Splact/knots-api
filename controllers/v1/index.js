'use strict';

/// Meta info
// version:    1;

/// Load Core and Third-party modules
var apiRouter = require('express').Router(); // get an instance of the express Router

/// Load Sub-routes
//var utilityRouter = require('./utility-router');
var authRouter    = require('./auth.router');
var searchRouter  = require('./search.router');
var topicRouter    = require('./topic.router');
var userRouter    = require('./user.router');

/// Api routes
//apiRouter.use('/', utilityRouter);
//apiRouter.use('*', AuthController.requireApiKey);
apiRouter.use('/', authRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/topics', topicRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
