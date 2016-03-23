'use strict';

var _          = require('lodash'),
    config     = require('../config'),
    i18n       = require('./i18n'),
    helmet     = require('./helmet'),
    bodyParser = require('./body-parser'),
    passport   = require('./passport'),
    userCan    = require('./user-can'),
    cors       = require('./cors'),
    reqLogger  = require('./req-logger');

var register = function(app, middlewares, name) {
  var eventargs = {
    app: app,
    name: name || 'unknown'
  };
  app.emit('middleware:before', eventargs);
  if (name) app.emit('middleware:before:' + name, eventargs);

  if (!_.isArray(middlewares))
    middlewares = [middlewares];

  _.each(middlewares, function(m) {
    app.use(m);
  });

  if (name) app.emit('middleware:after:' + name, eventargs);
  app.emit('middleware:after', eventargs);
};
var registerMiddlewares = function (app) {
  if (config.meta.env !== 'production')
    register(app, reqLogger, 'reqLogger');
  register(app, i18n, 'i18n');
  register(app, [
    helmet.hidePoweredBy,
    helmet.ieNoOpen,
    helmet.frameguard,
    helmet.noSniff,
    helmet.xssFilter,
    helmet.csp
  ], 'helmet');
  register(app, [
    bodyParser.json,
    bodyParser.urlencoded
  ], 'bodyParser');
  register(app, passport, 'passport')
  register(app, userCan, 'userCan');
  register(app, cors, 'cors');
}

module.exports = registerMiddlewares;
