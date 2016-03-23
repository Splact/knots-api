'use strict';

var bodyParser = require('body-parser'),
    options;

options = {
  limit: '8mb'
};

// Get json-encoded data from HTTP requests body
module.exports = bodyParser.json(options);
