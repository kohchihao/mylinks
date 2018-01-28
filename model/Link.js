var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({

	user_id: {
		type: Number
	},
	url_title: String,
	url_link: String,
});

module.exports = mongoose.model('Link', linkSchema);