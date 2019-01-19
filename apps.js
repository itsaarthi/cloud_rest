var express = require('express');
var cors = require('cors');
var app = express();
var db = require('./db'); // Use this when your using DB
global.__root   = __dirname + '/';


app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/userController');
app.use('/api/user', UserController);

module.exports = app;
