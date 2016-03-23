'use strict';

var constants = require('../constants'),
    _         = require('lodash'),
    rolesMap  = {};

rolesMap[constants.ROLE_GOD] = [
  constants.PERMISSION_READ_PROFILE,
  constants.PERMISSION_UPDATE_PROFILE
];
rolesMap[constants.ROLE_ADMIN] = [
  constants.PERMISSION_READ_PROFILE,
  constants.PERMISSION_UPDATE_PROFILE
];
rolesMap[constants.ROLE_USER] = [
  constants.PERMISSION_READ_PROFILE,
  constants.PERMISSION_UPDATE_PROFILE
];

var userCan = function(role) {
  return function(permission) {
    return (!!~rolesMap[role].indexOf(permission));
  }
};

module.exports = function() {
  var permissions,
      calledAsMiddleware = false;

  if (arguments.length > 2) {
    calledAsMiddleware = true;
  } else if (arguments.length === 1) {
    if (_.isArray(arguments[0]))
      permissions = arguments[0];
    else if (_.isFinite(arguments[0]))
      permissions = [arguments[0]];
  }

  var appendUserCan = function(req, res, next) {
    if (req.user)
      user.can = userCan(user.role);

    next();
  };

  var validateCurrentRequest = function(req, res, next) {
    if (!req.isAuthenticated())
      return res.status(401).json({
        message: req.__('You need to be logged to access this page.'),
        reason: constants.AUTH_LOGIN_NEEDED
      });

    var valid = true,
        role = req.user.role,
        i = 0,
        len = permissions.length;

    // verify all userCan needed for that role
    while(valid && (i < len)) valid = (!!~rolesMap[role].indexOf(permissions[i++]));

    if (!valid)
      return res.status(403).json({
        message: req.__('You have not the permissions needed to access this page.'),
        reason: constants.AUTH_PERMISSION_DENIED
      });

    next();
  };

  if (calledAsMiddleware)
    return appendUserCan(arguments[0], arguments[1], arguments[2]);
  else
    return validateCurrentRequest;

};
