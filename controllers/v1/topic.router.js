'use strict';

/// Meta info
// route path: /topics
// version:    1;

/// Load Core and Third-party modules
var topicRouter = require('express').Router(),
    passport    = require('passport'),
    _           = require('lodash'),
    constants   = require('../../lib/constants'),
    Topic       = require('../../models/topic'),
    User        = require('../../models/user');

/// Defining params
topicRouter.param('tag', function(req, res, next, tag) {
  Topic.findOne({ tag: tag }, function(err, topic) {
    // if something weird happens, abort
    if (err)
      return next(err);

    if (!topic)
      return res.status(404).json({ message: req.__('Topic not found.') });

    req.payload.topic = topic;

    next();
  });
});

/// Defining specific middlewares
var topicResponse = function(req, res) {
  return res.status(200).json(req.payload.topic.view(constants.MODEL_VIEW_DEFAULT));
};
var loadCheckins = function(req, res, next) {
  var topic = req.payload.topic;

  User.populate(topic, { path: 'users' }, function(err, populatedTopic) {
    // if something weird happens, abort
    if (err)
      return next(err);

    req.payload.checkins = populatedTopic.users;

    next();
  });

};
var showCheckins = function(req, res) {
  var users = [];

  _.each(req.payload.checkins, function(u) {
    users.push(u.view(constants.MODEL_VIEW_DEFAULT));
  });

  return res.status(200).json({
    checkins: users
  });
};

var createTopic = function(req, res, next) {
  var user = req.user,
      tag = req.body.tag,
      topic = new Topic();

  // TODO: check input

  topic.tag = tag;
  topic.users = [user._id];
  topic.createdBy = user._id;
  topic.save(function(err, topic) {
    if (err)
      return res.status(400).json(err);

    // keep payload updated
    req.payload.topic = topic;

    next();
  });

};

var doCheckin = function(req, res, next) {
  var user = req.user,
      topic = req.payload.topic;

  if (_.find(topic.users, function(u) { return u.equals(user._id); }))
    return res.status(400).json({ message: req.__('Checkin already done.') });

  topic.users.push(user._id);
  topic.save();

  // keep payload updated
  req.payload.topic = topic;

  next();
};

var doCheckout = function(req, res, next) {
  var user = req.user,
      topic = req.payload.topic;

  if (!_.find(topic.users, function(u) { return u.equals(user._id); }))
    return res.status(400).json({ message: req.__('Checkout already done.') });

  topic.users.pop(user._id);
  topic.save();

  // keep payload updated
  req.payload.topic = topic;

  next();
};

/// Register middlewares
// require authentication on these paths
topicRouter.post('*', passport.authenticate(['bearer', 'local', 'facebook-token']));
topicRouter.put('*', passport.authenticate(['bearer', 'local', 'facebook-token']));
topicRouter.delete('*', passport.authenticate(['bearer', 'local', 'facebook-token']));

/// Register responses
topicRouter.post('/', createTopic, loadCheckins, showCheckins);
topicRouter.put('/:tag/checkins', doCheckin);
topicRouter.delete('/:tag/checkins', doCheckout);
topicRouter.all('/:tag/checkins', loadCheckins, showCheckins);
topicRouter.get('/:tag', topicResponse);

module.exports = topicRouter;
