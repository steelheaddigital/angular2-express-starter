
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import * as dotenv from 'dotenv';
import * as express from 'express';
import path = require('path');
const jsend = require('jsend');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dotenv.config();

let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client')));
app.use(jsend.middleware);

// configure routes
app.use('/api/user', require('./api/user'));
app.use('/api/auth', require('./api/auth'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  res.status(404);
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500)
    res.jsend.error({
      message: err.message,
      data: err.stack
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  res.status = err.status || 500;
  res.jsend.error({
    message: err.message
  });
});


module.exports = app;
