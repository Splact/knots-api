'use strict';

var helmet = require('helmet'),
    options;

options = {
  defaultSrc: ['\'self\'', 'mka.co', 'www.mka.co', 'mka.dev:3000'],
  scriptSrc: [
    '\'self\'',
    '\'unsafe-eval\'',
    '\'unsafe-inline\'',
    'maps.gstatic.com',
    'maps.google.com',
    '*.googleapis.com',
    'www.google-analytics.com',
    'ajax.googleapis.com'
  ],
  styleSrc: ['\'self\'', '\'unsafe-inline\'', 'code.angularjs.org', 'fonts.googleapis.com'],
  imgSrc: [
    '*'
  ],
  connectSrc: ['\'self\''],
  fontSrc: ['\'self\'', 'fonts.googleapis.com', 'fonts.gstatic.com'],
  objectSrc: ['\'self\''],
  mediaSrc: ['\'self\''],
  frameSrc: ['\'self\''],
  sandbox: ['allow-forms', 'allow-modals', 'allow-same-origin', 'allow-scripts', 'allow-popups'],
  //reportUri: '/report-violation',
  reportOnly: false, // set to true if you only want to report errors
  setAllHeaders: false, // set to true if you want to set all headers
  safari5: false // set to true if you want to force buggy CSP in Safari 5
};

//
module.exports = helmet.contentSecurityPolicy(options);
