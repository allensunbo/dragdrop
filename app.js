/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
// routes = require('./routes'),
// api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  fs = require('fs'), cors = require('cors');

var app = module.exports = express();

app.use(cors());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
// app.use(cookieParser());

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  // app.use(express.errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}

// serve index and view partials
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/public/views/index.html');
});


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
