'use strict';

var mongoose = require('mongoose'),
    config = require('./config'),
    log = require('./logger');

var DB = function () {

  this.init = function(app) {
    var dbConnection = mongoose.connection;
    dbConnection.on('error', function(err) {
      app.emit('db:connection:error', err)
      log.error(err, 'connection error');
    });
    dbConnection.once('open', function callback() {
      app.emit('db:connection:open', {
        host: config.database.host,
        port: config.database.port,
        name: config.database.name,
        user: config.database.user,
        password: config.database.password,
        dbms: 'mongodb'
      })
    });
  };
  this.connect = function() {
    var userAccess = '';
    if (config.database.user && config.database.password) {
      userAccess = config.database.user + ':' + config.database.password + '@';
    }
    mongoose.connect('mongodb://' + userAccess + config.database.host + ':'+ config.database.port +'/' + config.database.name);
  };
};

module.exports = new DB();
