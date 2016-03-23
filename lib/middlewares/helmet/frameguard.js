'use strict';

var helmet = require('helmet');

// The X-Frame HTTP header restricts who can put your site in a frame. setting Same-origin by default allowed.
module.exports = helmet.frameguard();
