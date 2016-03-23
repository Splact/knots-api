'use strict';

var i18n = require('i18n'),
    config = require('../config');

/// Configuration
i18n.configure({
  locales: config.i18n.locales,
  defaultLocale: config.i18n.defaultLocale,
  directory: __dirname + '/../../' + config.i18n.directory,
  updateFiles: config.i18n.updateFiles
});

module.exports = i18n.init;
