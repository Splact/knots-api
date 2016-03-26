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
      return res.status(404).json({ message: req.__('User not found.') });

    req.payload.user = user;

    next();
  });
});

/// Defining specific middlewares
var userResponse = function(req, res) {
  return res.status(200).json(req.payload.user.view(constants.MODEL_VIEW_DEFAULT));
};

var targetCurrentUser = function(req, res, next) {
  req.payload.user = req.user;
  next();
};

var updateUserPosition = function(req, res, next) {
  var user = req.payload.user;
  var position = req.body.position;

  // TODO: check input
  position = {
      coordinates: [ position.lng || 0, position.lat || 0]
  };

  user.position = position;
  user.save();

  next();
};

/// Register middlewares
// require authentication and target current user on these paths
userRouter.all([
  '/me',
  '/position'
], passport.authenticate(['bearer', 'local', 'facebook-token']), targetCurrentUser);

/// Register responses
userRouter.get('/me', userResponse);

userRouter.put([
  '/position',
  '/:username/position'
], updateUserPosition, userResponse);

userRouter.get('/:username', userResponse);

module.exports = userRouter;
