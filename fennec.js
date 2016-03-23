'use strict';

var express               = require('express'),
    app                   = express(),
    config                = require('./lib/config'),
    registerMiddlewares   = require('./lib/middlewares'),
    tail                  = require('./lib/middlewares/tail'),
    registerEventHandlers = require('./lib/serverEventHandlers'),
    db                    = require('./lib/database'),
    subdomain             = require('express-subdomain'),
    controllers           = require('./controllers');

/// Register event handler
registerEventHandlers(app);

/// Connect to DB
db.init(app); // initialize db
db.connect(); // connect

/// Register middlewares
registerMiddlewares(app);

/// Register routes
app.use(subdomain('api', controllers));
app.use( '/', express.static('./public') );

/// Register error handler
tail(app);

var startFennec = function() {
  app.listen(config.http.port);
  app.emit('listening');
};

if(require.main === module){
  // application run directly; start app server
  startFennec();
} else {
  // application imported as a module via "require": export function to create server
  module.exports = startFennec;
}
