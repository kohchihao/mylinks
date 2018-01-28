var request = require('request');

var config = require('./config');
var User = require('../model/User');

const Telegraf = require('telegraf')
const bot = new Telegraf('498249906:AAEEVPwPWQX4nnDaWHP1Qw0Tfu-Jn6tIpP8')

module.exports = function (req, res) {
  var options;
  console.log(req.query.telegramId)
    options = {
      url: 'https://api.instagram.com/oauth/access_token',
      method: 'POST',
      form: {
        client_id: config.instagram.client_id,
        client_secret: config.instagram.client_secret,
        grant_type: 'authorization_code',
        redirect_uri: config.instagram.redirect_uri_telegram+"?telegramId="+req.query.telegramId,
        code: req.query.code
      }
    };
  
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
        telegram_id : req.query.telegramId
      };
      
      var query = {'id':user.id};
      console.log(query)
      User.findOneAndUpdate(query, user, {upsert:true}, function(err, doc){
        if (err) return res.status(500).send({ error : err });
        bot.telegram.sendMessage(req.query.telegramId,"Okay you are logged in. Please use /setlinks to set your links :)");
        return res.render('index', { title: 'MyLinks' });//res.status(200).send(user);
      });

			// User.create(user, function (error) {
			// 	if (error) res.send(error);
			// 	res.redirect('/');
			// })
		} else {
      console.log("Error?",error)
    }
	});
};

