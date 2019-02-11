var express = require('express');
var cors = require('cors');
var app = express();
//var db = require('./db'); // Use this when your using DB
global.__root   = __dirname + '/';
console.log("status");
var whitelist = ['https://portal.infynect.com', 'http://localhost'];
var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

var UserController = require(__root + 'user/userController');
app.use('/api/users', UserController);

/*app.post('/api/user',function(req,res){
	console.log("req",req.body);
	res.status(200).send('success!');
})*/


module.exports = app;