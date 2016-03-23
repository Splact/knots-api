'use strict';

var config = require('../config'),
    log = require('../logger');

module.exports = function () {
  if (config.meta.env !== 'production') {
    console.log( '==================================================' );
    console.log( '# ' + ((new Date()).toUTCString()));
    console.log( '#' );
    console.log( '# ' + config.meta.sitename + ' started in "'+ config.meta.env +'" mode' );
    console.log( '#          api -> %s:%d', config.http.apiUrl, config.http.port);
    console.log( '#   web client -> %s:%d', config.http.baseUrl, config.http.port);
    console.log( '==================================================' );
  } else {
    var logData = {
      env: config.meta.env,
      port: config.http.port,
      apiUrl: config.http.apiUrl,
      baseUrl: config.http.baseUrl
    };
    log.info(logData, 'Fennec is listening');
  }
};
