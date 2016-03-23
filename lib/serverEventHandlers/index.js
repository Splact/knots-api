'use strict';

var onServerListening = require('./on-server-listening'),
    onMiddlewareRegistered = require('./on-middleware-registered'),
    onDBConnected = require('./on-db-connected');

var registerEventHandlers = function(app) {
  app.on('listening', onServerListening);
  app.on('middleware:after', onMiddlewareRegistered);
  app.on('db:connection:open', onDBConnected);
}

module.exports = registerEventHandlers;
