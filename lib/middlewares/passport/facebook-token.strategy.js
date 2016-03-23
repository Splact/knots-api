'use strict';

var User = require('../../../models/user'),
    FacebookTokenStrategy = require('passport-facebook-token'),
    constants = require('../../constants'),
    config = require('../../config');

var signup = function(profile, done) {
  // create an username
  var username    = 'fb-' + profile.id,
      emails      = [],
      email       = profile.email || profile._json.email || null,
      displayName = profile.displayName || profile._json.name || username,
      gender      = profile.gender || profile._json.gender || 'undefined';

  var newUser = new User();

  if (email)
  // TODO: validate email (?)
    emails.push({
      email: email,
      // INFO: When a user signup with facebook, we assume that he is human and verified before from Facebook auth systems.
      verified: true,
      primary: true
    });

  newUser.username = username;
  newUser.emails = emails;
  newUser.displayName = displayName;
  newUser.gender = gender;
  newUser.loc = {
    coordinates: [0, 0]
  };
  // stores all facebook data
  newUser.facebook = profile._json;
  // save signup provider
  newUser.provider = 'facebook';

  newUser.save(function(err, user) {
    if (err)
      return done(err);

    return done(null, user);
  });
}

var options = {
  clientID: config.oauth.facebook.appId,
  clientSecret: config.oauth.facebook.appSecret
};

module.exports = new FacebookTokenStrategy(options, function(accessToken, refreshToken, profile, done) {
  // retrieve the user from the database by facebook id
  User.findOne({'facebook.id': profile.id}, function (err, user) {

    // if something weird happens, abort
    if (err)
      return done(err);

    // if we couldn't find a matching user, it's time for a signup
    if (!user)
      return signup(profile, done);

    if (!user.active)
      return done(null, false, { reason: constants.AUTH_INACTIVE });

    // if everything passes, return the retrieved user object.
    return done(null, user);
  });
});
