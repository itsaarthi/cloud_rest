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
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
app.use(bodyParser.json());
const editJsonFile = require("edit-json-file");
var conf = editJsonFile('conf.json');
var db = require('./db'); // Use this when your using DB

const fileUpload = require('express-fileupload');
app.use(fileUpload());
var user = require('./user');
//console.log(user);

const netIface = require('network-interfaces');

const options = {
  internal: false, // boolean: only acknowledge internal or external addresses (undefined: both)
  ipVersion: 4     // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
};


const netDev = netIface.getInterface(options);
var key = randomstring.generate(5);

var fs = require('fs');

app.post('/user/login',function(req,res){

 console.log("req",req.body)
  user.find({key:req.body.key},function (err, client) {
    console.log("c",client);
    console.log("mac",client[0].mac);
    console.log("mac_req",req.body.mac);
    if(err){
      res.status(500).send("DBERR");
    }
    else{
    if ( client[0].mac == req.body.mac  ){
      res.status(200).send("Login successfully ");
    }
    else{
 res.status(500).send("login Failed") 
     }
   }
   });
})

app.post('/user/register',function(req,res){
  console.log("req",req.body);
	if (!req.body.user_name || !req.body.password ){
	res.status(500).send("Registration Failed ");
 }
 console.log("mail",req.body.mail_id);
 conf.set('name',req.body.user_name);
 conf.set('password',req.body.password);
 conf.set('mac',req.body.mac);
 conf.save();
  
 let transporter = nodemailer.createTransport({
  service: 'Zoho',
  host: 'smtp.zoho.com',
  secure: 'true',
  port: '465',
  auth: {
    type: 'Basic Auth',
    user: 'csindhu@spido.in',
    pass:'8124937475'
  }
});

 let mailOptions = {
    from: 'csindhu@spido.in',
    to: req.body.mail_id,
    subject: 'Message from M2M Cloud',
    text: key
  };

console.log("mailopt",mailOptions)
  transporter.sendMail(mailOptions, function(e, r) {
  if (e) {
    console.log(e);}
  else {
    console.log(r);
      }
  transporter.close();
  });
 user.create({   
        user_id          : req.body.user_name,
        password	       : req.body.password,
        mac		           : req.body.mac, 
        key              : key 
      }, 
      function (err, Live) {
        if (err){
          return res.status(500).send("There was a problem adding the information to the database.");
        }
});
 res.status(200).send("Registration done for user");
})

app.listen(8002);
