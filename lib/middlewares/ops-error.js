'use strict';

module.exports = function(err, req, res, next) {
  // response to user
  res.status(500).json(err);
};
