'use strict';

var log = require('../logger'),
    pino = require('pino');

module.exports = function(req, res, next) {
  req.payload = {};
  // NOTE: BodyParser is not yet effective here (so no body in req)
  log.info(pino.stdSerializers.req(req));
  next();
};
