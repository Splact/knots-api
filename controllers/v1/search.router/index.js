'use strict';

/// Meta info
// route path: /search
// version:    1;

/// Load Core and Third-party modules
var searchRouter = require('express').Router(),
    _ = require('lodash'),
    config     = require('../../../lib/config');

/// Load Sub-routes
var searchTopicRouter = require('./topic.router'),
    searchUserRouter  = require('./user.router');

/// Defining specific middlewares
var parseQuery = function(req, res, next) {
  var q = req.query.q,
      limit = req.query.limit || config.search.limit,
      sortField = req.query.sort || 'default',
      sort = {},
      order = req.query.order || config.search.order,
      page = req.query.page || config.search.page;

  // validate q
  if (!q || q.length < config.search.minQueryLength)
    return res.status(400).json({ message: req.__('Query not valid.') });

  // validate and parse limit
  limit = _.parseInt(limit);
  if (!_.isFinite(limit) || (limit < 1))
    return res.status(400).json({ message: req.__('Results limit not valid.') });

  // validate and parse order
  if (order === 'asc')
    order = 1;
  else if (order === 'desc')
    order = -1;
  else
    return res.status(400).json({ message: req.__('Results order not valid.') });

  // create sort object
  sort[sortField] = order;

  // validate and parse page number
  page = _.parseInt(page);
  if (!_.isFinite(page) || (page < 1))
    return res.status(400).json({ message: req.__('Results page not valid.') });

  // define regexp based on q
  var queryWords = _.uniq(q.split(/[\s\-,]+/)),
      queryPattern = '';
  _.each(queryWords, function(w) {
    queryPattern += '(?=.*'+ w +')';
  });
  queryPattern += '.*';

  // attach search params to the request
  req.payload.search = {
    params: {
      q    : new RegExp(queryPattern, 'ig'),
      limit: limit,
      sort : sort,
      page : page
    }
  };

  next();
};

/// Register middlewares
searchRouter.use('*', parseQuery);

/// Register sub routes
searchRouter.use('/topics', searchTopicRouter);
searchRouter.use('/users', searchUserRouter);

module.exports = searchRouter;
