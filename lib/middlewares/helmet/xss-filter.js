'use strict';

var helmet = require('helmet'),
    options;

options = {
  setOnOldIE: true
};

// Set X-XSS-Protection header also for IE old
module.exports = helmet.xssFilter(options);
