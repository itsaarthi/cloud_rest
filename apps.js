var express = require('express');
var cors = require('cors');
var app = express();
//var db = require('./db'); // Use this when your using DB
global.__root   = __dirname + '/';

var whitelist = ['https://portal.infynect.com', 'http://localhost'];

var corsOptionsDelegate = function(req, cb) {
  var corsOptions;
  if(whitelist.indexOf(req.header('Origin')) !== -1) {
          corsOptions = { origin: true }
  } else {
          corsOptions = { origin: false }
  }
  cb(null, corsOptions);
}

app.use('/api', cors(corsOptionsDelegate), function(req, res, next) {
  next();
});

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});


module.exports = app;