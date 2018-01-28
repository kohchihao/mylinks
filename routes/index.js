var express = require('express');
var router = express.Router();

var config = require('./config');
var authUser = require('./authService');
var authTelegram = require('./authTelegram');

var User = require('../model/User');
var Link = require('../model/Link');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyLinks' });
});

//To redirect to instagram api 
router.get('/login',function(req, res, next) {
  res.redirect(config.instagram.auth_url);
});

//to redirect for Telegram users
router.get('/login/:telegramId',function(req, res, next) {
  res.redirect(config.instagram.auth_url_telegram+req.params.telegramId);
});

//auth for telegram users
router.get('/authtelegram',authTelegram);

//auth?code=…. 
router.get('/auth',authUser);

//Fetch all user details. 
router.get('/user/:access_token',function(req,res,next) {
  var query = {'access_token':req.params.access_token };
  console.log(query)
  User.findOne(query, function(err, doc){
    if (err) return res.status(500).send({ error: err });
    return res.status(200).send(doc);
  });
});

//To create the database for the user urls. 
router.post('/createlinks/:userId',function(req,res,next) {
  var query = {'id':req.params.userId };
  var access_token = req.body.access_token;

  //check if user exist. 
  User.findOne({access_token: access_token}, function(err, user){
    if(user) {
      var link = {
        user_id: req.params.userId,
        url_title: req.body.url_title,
        url_link: req.body.url_link
      };

      //push to db 
      Link.create(link, function (error) {
        if (error) res.send(error);
        res.status(200).send(link);
      })
    } else {
      res.status(403).send({error: "User does not exist"});
    }
  });
});

//To fetch users url 
router.post('/getlinks/:userId',function(req,res,next) {
  var query = {'user_id':req.params.userId };
  var access_token = req.body.access_token;
  //check if user exist. 
  User.findOne({access_token: access_token}, function(err, user){
    if(user) {
      console.log(query)
      Link.find(query,function(err, result) {
        if (err) throw res.send(err);
        res.status(200).send(result);
      });
    } else {
      res.status(403).send({error: "User does not exist"});
    }
  });
  
});

//To get the user data. 
router.get('/:instagramId',function(req,res,next) {
  var instagramId = req.params.instagramId
  User.findOne({username: instagramId}, function(err, user){
    if(user) {
      console.log(user)
      var query = {'user_id':user.id};
      Link.find(query,function(err, result) {
        if (err) throw res.send(err);
        var data = {
          user : user , 
          links : result
        }
        res.render('insta', { data : data });
        //res.status(200).send(data);
      });
    } else {
      res.status(403).send({error: "User does not exist"});
    }
  });
});

//TELEGRAM STUFF BELOW HERE

//To create the database for the user urls. 
router.post('/telegram/createlinks/:telegramId',function(req,res,next) {
  //check if user exist. 
  User.findOne({telegram_id: req.params.telegramId}, function(err, user){
    if(user) {
      var link = {
        user_id: user.id,
        url_title: req.body.url_title,
        url_link: req.body.url_link
      };

      //push to db 
      Link.create(link, function (error) {
        if (error) res.send(error);
        res.status(200).send(link);
      })
    } else {
      res.status(403).send({error: "User does not exist"});
    }
  });
});

//To fetch users url 
router.post('/telegram/getlinks/:telegramId',function(req,res,next) {
  

  //check if user exist. 
  User.findOne({telegram_id: req.params.telegramId}, function(err, user){
    if(user) {
      
      var query = {'user_id':user.id };
      Link.find(query,function(err, result) {
        if (err) throw res.send(err);
        res.status(200).send(result);
      });
    } else {
      res.status(403).send({error: "User does not exist"});
    }
  });
  
});

module.exports = router;
