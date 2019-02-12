//STORES INFORMATION ABOUT THE ACTIVE DEVICES 
var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({ 
	
   user_id        : String,
   password       : String,
   mac           : String
	
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
