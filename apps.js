// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var app = express();
// var port = 8002;
// var http = require('http');
// //var db = require('./db'); // Use this when your using DB
// global.__root   = __dirname + '/';
// console.log("status");
// var whitelist = ['https://portal.infynect.com', 'http://localhost'];
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

// var corsOptionsDelegate = function(req, cb) {
//   var corsOptions;
//   if(whitelist.indexOf(req.header('Origin')) !== -1) {
//           corsOptions = { origin: true }
//   } else {
//           corsOptions = { origin: false }
//   }
//   cb(null, corsOptions);
// }

// app.use('/api', cors(corsOptionsDelegate), function(req, res, next) {
//   next();
// });

// app.get('/api', function (req, res) {
//   res.status(200).send('API works.');
// });

// /*var UserController = require(__root + 'user/userController');
// app.use('/api/users', UserController);*/

// app.post('/api/user/register',function(req,res){
// 	console.log("req",req.body.user_name);
//     console.log("files",req.files);
//     res.status(200).send('success!');
// })

// app.post('/api/user/login',function(req,res){
// 	console.log("req",req.body.user_name);
//     console.log("files",req.files);
//     res.status(200).send('success!');
// })

// app.post('/cli',function(req,res){
//         console.log("req",req.body);
//         console.log("files",req.files);
//         /*fs.writeFileSync("/etc/ec/nuclix/nginx/ssl/livye.com/key.pem",req.files$
//         fs.writeFileSync("/etc/ec/nuclix/nginx/ssl/livye.com/cert.pem",req.file$*/
//         res.status(200).send("success");
// })


// app.post('/cli',function(req,res){
//         console.log("req",req.body.user_name);
//         console.log("files",req.files);
// /*      fs.writeFileSync("/etc/ec/nuclix/nginx/ssl/livye.com/key.pem",req.files$
//         fs.writeFileSync("/etc/ec/nuclix/nginx/ssl/livye.com/cert.pem",req.file$
//         res.status(200).send("success"); */
// })

// app.listen(8002)
// module.exports = app;

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const editJsonFile = require("edit-json-file");
var conf = editJsonFile('conf.json');

const fileUpload = require('express-fileupload');
app.use(fileUpload());

var fs = require('fs');

app.post('/user/login',function(req,res){
	if (req.body.user_name == conf.get('name') && req.body.password == conf.get('password') && req.body.mac == conf.get('mac')){
	res.status(200).send("Login successfully ");
 }
 else{
 res.status(500).send("login Failed")	
 }
 
})

app.post('/user/register',function(req,res){
	if (!req.body.user_name || !req.body.password ){
	res.status(500).send("Registration Failed ");
 }
 conf.set('name',req.body.user_name);
 conf.set('password',req.body.password);
 conf.set('mac',req.body.mac);
 conf.save();
 res.status(200).send("Registration done for user");
})

app.listen(8002);