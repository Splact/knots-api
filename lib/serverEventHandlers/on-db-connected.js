'use strict';

var config = require('../config'),
    log = require('../logger');

module.exports = function (eventargs) {
  if (config.meta.env !== 'production') {
    console.log('%s connected to %s through %s', eventargs.dbms, eventargs.name, eventargs.host + ':' + eventargs.port);
  } else {
    var logData = {
      host: eventargs.host,
      port: eventargs.port,
      dbms: eventargs.dbms,
      name: eventargs.name
    };
    log.info(logData, 'DB Connected');
  }
};
