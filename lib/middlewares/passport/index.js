'use strict';

var passport = require('passport'),
    local = require('./local.strategy'),
    facebookToken = require('./facebook-token.strategy');

/// Configuration
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (user, done) {
  User.findOne({_id: user._id}, function (err, user) {
    done(err, user);
  });
});

passport.use(local);
passport.use(facebookToken);
module.exports = passport.initialize();
