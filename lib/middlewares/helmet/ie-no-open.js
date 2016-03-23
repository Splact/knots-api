'use strict';

var helmet = require('helmet');

// Set the X-Download-Options header to noopen to prevent IE users from executing downloads in your site's context.
module.exports = helmet.ieNoOpen();
