
/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    path = require('path');

// Load Database
var mongo = require('mongoskin');
var mongoUri = process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL ||
    'mongodb://localhost:27017/mysite';

var db = mongo.db(mongoUri, {native_parser:true}); 
var app = module.exports = express();

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.configure(function(){
  app.set('port', process.env.PORT || 9000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '.')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

require('./routes');

// Load todos here
var todos = require('./lib/todosMod/');
app.use(todos);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
