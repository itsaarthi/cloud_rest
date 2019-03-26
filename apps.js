global.__root   = __dirname + '/';
var express = require("express");
var fs=require("fs");
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
app.use(bodyParser.json());
const editJsonFile = require("edit-json-file");
var conf = editJsonFile('conf.json');
var db = require('./db'); // Use this when your using DB
//var cert = require(__root+'cert/certController')
var exec = require('child_process').exec;
const fileUpload = require('express-fileupload');
app.use(fileUpload());
var user = require('./user');
//console.log(user);

const netIface = require('network-interfaces');

const options = {
  internal: false, // boolean: only acknowledge internal or external addresses (undefined: both)
  ipVersion: 4     // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
};

//console.log("cert",cert);
const netDev = netIface.getInterface(options);

var fs = require('fs');

if(!fs.existsSync("ca-crt.pem")){
    exec('./ca.sh');
}
if(!fs.existsSync('server-crt.pem')){
    exec('./server.sh');
}


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
    if ( client[0].mac == req.body.mac && client[0].password == req.body.password ){
      res.status(200).send("Login successfully ");
    }
    else{
 res.status(500).send("login Failed") 
     }
   }
   });
})

app.post('/user/register',function(req,res){

  var key = randomstring.generate(5);
  console.log("req",req.body);
	if (!req.body.user_name || !req.body.password ){
	res.status(500).send("Registration Failed ");
 }
 

fs.writeFileSync('client-csr.pem',req.body.csr,function(err){
    if(err) return;
  });
  fs.writeFileSync('client.cnf',req.body.cnf,function(err){
    if(err) return;
  });

 exec("chmod 777 client.cnf client-csr.pem");
  exec('./sign.sh', function(err,stdout,stderr){

  var client_cert = fs.readFileSync('client-crt.pem').toString();
  var ca_crt      = fs.readFileSync('ca-crt.pem').toString();
  

  
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
 res.status(200).send({cert : client_cert,ca_crt:ca_crt});
})
  });

app.listen(8002);
