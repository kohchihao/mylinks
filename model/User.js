var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

	id: {
		type: Number,
		index: {
			unique: true,
		}
	},
	username: String,
	full_name: String,
	bio: String,
	website: String,
	profile_picture: String,
	access_token: String,
	telegram_id: Number

});

module.exports = mongoose.model('User', userSchema);