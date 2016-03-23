'use strict';

/// Meta info
// route path: /
// version:    1;

/// Load Core and Third-party modules
var authRouter = require('express').Router(),
    passport   = require('passport'),
    constants  = require('../../lib/constants');

/// Defining params

/// Defining common response
var authResponse = function(req, res) {
  return res.status(200).json(req.user.view(constants.MODEL_VIEW_AUTH));
};

/// Defining subroutes
authRouter.post('/login', passport.authenticate('local'), authResponse);

// token passed as access_token
authRouter.post('/login/facebook', passport.authenticate('facebook-token'), authResponse);

/*authRouter.post('/signup', function(req, res, next) {
  AuthController.localSignup({
    username: req.body.username,
    displayName: req.body.displayName,
    location: req.body.location,
    bio: req.body.bio,
    gender: req.body.gender,
    children: req.body.children,
    picture: req.files.picture || req.body.picture,
    email: req.body.email,
    password: req.body.password
  }, function(err, token) {
    if (err)
      return next(err);

    return res.status(201).json({ token: token });

  });

});*/

/*authRouter.post('/logout', function(req, res) {
  if (req.isAuthenticated())
    req.logout();
  return res.sendStatus(204);
});*/

module.exports = authRouter;
