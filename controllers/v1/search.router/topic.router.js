'use strict';

/// Meta info
// route path: /search/topics
// version:    1;

/// Load Core and Third-party modules
var searchTopicRouter = require('express').Router(),
    _                 = require('lodash'),
    constants         = require('../../../lib/constants'),
    Topic             = require('../../../models/topic');

/// Defining params

/// Defining specific middlewares
var search = function(req, res, next) {
  var searchParams = req.payload.search.params,
      defaultSortField = 'tag';

  // override default sort field if needed
  if (searchParams.sort.default) {
    var order = searchParams.sort.default;
    delete searchParams.sort.default;
    searchParams.sort[defaultSortField] = order;
  }

  Topic
    .find({ tag: searchParams.q })
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
  var topics = [];

  _.each(req.payload.search.results, function(t) {
    topics.push(t.view(constants.MODEL_VIEW_DEFAULT));
  });

  return res.status(200).json({
    results: topics
  });
};

/// Register middlewares

/// Register responses
searchTopicRouter.get('/', search, show);

module.exports = searchTopicRouter;
