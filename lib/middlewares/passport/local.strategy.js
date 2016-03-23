'use strict';

var User = require('../../../models/user'),
    LocalStrategy = require('passport-local').Strategy,
    constants = require('../../constants');

module.exports = new LocalStrategy(function(username, password, done) {

  // retrieve the user from the database by username
  User.findOne({ username: username }, function(err, user) {

    // if something weird happens, abort
    if (err)
      return done(err);

    // if we couldn't find a matching user, abort with reasoning
    if (!user)
      return done(null, false, { reason: constants.AUTH_DOESNT_MATCH });

    // make sure that the provided password matches what's in the DB
    if (!user.authenticate(password))
      return done(null, false, { reason: constants.AUTH_DOESNT_MATCH });

    if (!user.active)
      return done(null, false, { reason: constants.AUTH_INACTIVE });

    // if everything passes, return the retrieved user object
    done(null, user);

  });

});
