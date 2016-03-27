'use strict';

var _           = require('lodash'),
    config      = require('../config'),
    i18n        = require('./i18n'),
    helmet      = require('./helmet'),
    bodyParser  = require('./body-parser'),
    passport    = require('./passport'),
    userCan     = require('./user-can'),
    cors        = require('./cors'),
    reqLogger   = require('./req-logger'),
    opsNotFound = require('./ops-not-found'),
    opsError    = require('./ops-error');

var MiddlewareUtils = function(app) {
  this.app = app;
};
MiddlewareUtils.prototype.register = function(middlewares, name) {
  var self = this;
  var eventargs = {
    app: this.app,
    name: name || 'unknown'
  };
  this.app.emit('middleware:before', eventargs);
  if (name) this.app.emit('middleware:before:' + name, eventargs);

  if (!_.isArray(middlewares))
    middlewares = [middlewares];

  _.each(middlewares, function(m) {
    self.app.use(m);
  });

  if (name) this.app.emit('middleware:after:' + name, eventargs);
  this.app.emit('middleware:after', eventargs);
};

MiddlewareUtils.prototype.head = function() {
  if (config.meta.env !== 'production')
    this.register(reqLogger, 'reqLogger');
  this.register(i18n, 'i18n');
  this.register([
    helmet.hidePoweredBy,
    helmet.ieNoOpen,
    helmet.frameguard,
    helmet.noSniff,
    helmet.xssFilter,
    helmet.csp
  ], 'helmet');
  this.register([
    bodyParser.json,
    bodyParser.urlencoded
  ], 'bodyParser');
  this.register(passport, 'passport');
  this.register(userCan, 'userCan');
  this.register(cors, 'cors');
};

MiddlewareUtils.prototype.tail = function() {
  this.register(opsError, 'opsError');
  this.register(opsNotFound, 'opsNotFound');
};

module.exports = function(app) {
  return new MiddlewareUtils(app);
};
