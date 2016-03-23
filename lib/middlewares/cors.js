'use strict';

var cors = require('cors');

var corsOptions = {
  allowedHeaders: 'X-Requested-With, content-type, Authorization, X-API-KEY'
};
module.exports = cors(corsOptions);
