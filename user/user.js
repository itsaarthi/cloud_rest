var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  

  user_name		: String,
  first_name	: String,
  last_name		: String,
  mail_id		  : String,
  phonenumber	: {type:Number,min:10},
  password		: String
  
});
mongoose.model('user', UserSchema);

module.exports = mongoose.model('user');
