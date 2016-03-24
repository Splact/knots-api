'use strict';

/// Meta info
// route path: /users
// version:    1;

/// Load Core and Third-party modules
var userRouter = require('express').Router(),
    passport   = require('passport'),
    constants  = require('../../lib/constants'),
    User       = require('../../models/user');

/// Defining params
userRouter.param('username', function(req, res, next, username) {
  User.findOne({ username: username }, function(err, user) {
    // if something weird happens, abort
    if (err)
      return next(err);

    if (!user)
      return res.status(404).json({ message: req.__('User not found') });

    req.params.user = user;

    next();
  });
});

/// Defining common responses
var currentUserResponse = function(req, res) {
  return res.status(200).json(req.user.view(constants.MODEL_VIEW_DEFAULT));
};

var userResponse = function(req, res) {
  return res.status(200).json(req.params.user.view(constants.MODEL_VIEW_DEFAULT));
};

/// Defining subroutes
userRouter.get('/me', passport.authenticate(['bearer', 'local', 'facebook-token']), currentUserResponse);
userRouter.get('/:username', userResponse);

module.exports = userRouter;
