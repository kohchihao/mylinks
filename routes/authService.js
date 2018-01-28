var request = require('request');

var config = require('./config');
var User = require('../model/User');
var path = require('path');

module.exports = function (req, res) {
  var options;
  
    options = {
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'POST',
      form: {
        client_id: config.instagram.client_id,
        client_secret: config.instagram.client_secret,
        grant_type: 'authorization_code',
        redirect_uri: config.instagram.redirect_uri,
        code: req.query.code
      }
  }
	
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var r = JSON.parse(body);
			var user = {
				id: r.user.id,
				username: r.user.username,
				full_name: r.user.full_name,
				bio: r.user.bio,
				website: r.user.website,
				profile_picture: r.user.profile_picture,
        access_token: r.access_token,
      };
      
      var query = {'id':user.id};
      User.findOneAndUpdate(query, user, {upsert:true}, function(err, doc){
        if (err) return res.status(500).send({ error: err });
        //return res.status(200).send(user);
        res.cookie('id', user.id);
        res.cookie('username', user.username);
        res.cookie('full_name', user.full_name);
        res.cookie('username', user.username);
        res.cookie('bio', user.bio);
        res.cookie('website', user.website);
        res.cookie('profile_picture', user.profile_picture);
        res.cookie('access_token', user.access_token);
        return res.status(200).redirect(config.main_page.link);
        //return res.sendFile(path.join(__dirname, '../public', 'index.html'));
      });

			// User.create(user, function (error) {
			// 	if (error) res.send(error);
			// 	res.redirect('/');
			// })
		} else {
      console.log("Error",error)
    }
	});

};