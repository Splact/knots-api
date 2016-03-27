'use strict';

module.exports = function(req, res){
  res.status(404).json({ message: req.__('Page not found.') });
};
