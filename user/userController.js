var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());


router.use(bodyParser.urlencoded({ extended: true }));
var user = require('./user');


router.post('/' , function (req, res) {


    User.create({ 
                    
                    user_name     : req.body.user_name,
                    first_name    : req.body.first_name,
                    last_name     : req.body.last_name,
                    mail_id       : req.body.mail_id,
                    password      : hashedPassword
                    
                }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});


module.exports = user;
