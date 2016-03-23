'use strict';

var hidePoweredBy = require('./hide-powered-by'),
    ieNoOpen = require('./ie-no-open'),
    frameguard = require('./frameguard'),
    noSniff = require('./no-sniff'),
    xssFilter = require('./xss-filter'),
    csp = require('./csp');

/// Configuration
module.exports = {
  hidePoweredBy: hidePoweredBy,
  ieNoOpen: ieNoOpen,
  frameguard: frameguard,
  noSniff: noSniff,
  xssFilter: xssFilter,
  csp: csp
};
