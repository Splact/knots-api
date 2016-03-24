'use strict';

var User = require('../../../models/user'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    constants = require('../../constants'),
    config = require('../../config');

module.exports = new BearerStrategy(
  function (accessToken, done) {
    User.findOne({ token: accessToken }, function (err, user) {
      // if something weird happens, abort
      if (err)
        return done(err);

      // if we couldn't find a matching user, abort with reasoning
      if (!user)
        return done(null, false, { reason: constants.AUTH_DOESNT_MATCH });

      if (!user.active)
        return done(null, false, { reason: constants.AUTH_INACTIVE });

      // if everything passes, return the retrieved user object.
      done(null, user);
    });
  }
);
