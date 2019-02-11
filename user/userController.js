
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/api/user',function(req,res){
	console.log("req",req.body);
	res.status(200).send('success!');
})

module.exports = router;