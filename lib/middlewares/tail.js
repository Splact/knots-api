'use strict';

var tail = function(app) {
  // Error handler
  app.use(function(err, req, res, next) {
    // response to user
    res.status(500).json(err);
  });
  // 404 handler
  app.use('*', function(req, res){
    res.status(404).json({ message: req.__('Page not found') });
  });
};

module.exports = tail;
