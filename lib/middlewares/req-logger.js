'use strict';

var log = require('../logger'),
    pino = require('pino');

module.exports = function(req, res, next) {
  log.info(pino.stdSerializers.req(req));
  next();
};
