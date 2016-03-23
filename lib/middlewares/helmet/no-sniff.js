'use strict';

var helmet = require('helmet');

// Sets the X-Content-Type-Options header to its only option, nosniff.
module.exports = helmet.noSniff();
