'use strict';

var helmet = require('helmet'),
    options;

options = {
  // camouflage
  setTo: 'PHP 5.5.3'
};

// The hidePoweredBy middleware will override the X-Powered-By header if it is set (which it will be by default in Express).
module.exports = helmet.hidePoweredBy(options);
