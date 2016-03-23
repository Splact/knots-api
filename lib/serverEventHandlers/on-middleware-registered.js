'use strict';

var config = require('../config'),
    log = require('../logger');

module.exports = function (eventargs) {
  if (config.meta.env !== 'production') {
    // logs the middleware name that is about to be registered
    console.log('Middleware registered: %s', eventargs.name);
  } else {
    var logData = {
      middleware: eventargs.name
    };
    log.info(logData, 'Middleware registered');
  }
};
