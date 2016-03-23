'use strict';

var express   = require('express'),
    apiRouter = express.Router(),
    config    = require('../lib/config'); // get an instance of the express Router

/// APIs routes

// define the api versions
var apiVersions = config.api.versions;

// route to display apiVersions
apiRouter.get('/versions', function(req, res) {
  res.status(200).json(apiVersions);
});

// versioned api routes go in the routes /api/ directory
// import the routes
for (var v in apiVersions) {
  // extends path to manage MAJOR.MINOR.PATCH versions
  var apiPaths = [
    '/v'+ apiVersions[v].version +'/',
    '/v'+ apiVersions[v].version +'.0/',
    '/v'+ apiVersions[v].version +'.0.0/'
  ];
  if (v+1 === apiVersions.length)
    apiPaths.push('/latest/');

  apiRouter.use(apiPaths, require('./v' + apiVersions[v].version));
}

module.exports = apiRouter;
