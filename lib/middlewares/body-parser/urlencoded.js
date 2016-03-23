'use strict';

var bodyParser = require('body-parser'),
    options;

options = {
  extended: true
};

// Get url-encoded data from HTTP requests body
module.exports = bodyParser.urlencoded(options);
