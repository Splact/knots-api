'use strict';

/// Meta info
// route path: /search/users
// version:    1;

/// Load Core and Third-party modules
var searchUserRouter = require('express').Router(),
    _                = require('lodash'),
    constants        = require('../../../lib/constants'),
    User             = require('../../../models/user');

/// Defining params

/// Defining specific middlewares
var search = function(req, res, next) {
  var searchParams = req.payload.search.params,
      defaultSortField = 'displayName';

  // override default sort field if needed
  if (searchParams.sort.default) {
    var order = searchParams.sort.default;
    delete searchParams.sort.default;
    searchParams.sort[defaultSortField] = order;
  }

  User
    .find({ displayName: searchParams.q })
    .sort(searchParams.sort)
    .skip((searchParams.page - 1) * searchParams.limit)
    .limit(searchParams.limit)
    .exec(function(err, users) {
      // if something weird happen, abort
      if (err)
        return next(err);

      req.payload.search.results = users;

      next();
    });
};

var show = function(req, res) {
  var users = [];

  _.each(req.payload.search.results, function(u) {
    users.push(u.view(constants.MODEL_VIEW_DEFAULT));
  });

  return res.status(200).json({
    results: users
  });
};

/// Register middlewares

/// Register responses
searchUserRouter.get('/', search, show);

module.exports = searchUserRouter;
