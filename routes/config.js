var in_client_id = process.env.INSTAGRAM_CLIENT_ID,
    in_client_secret = process.env.INSTAGRAM_CLIENT_SECRET,
    in_redirect_uri = 'https://secretive-shoemaker.glitch.me/auth',
    in_auth_url = 'https://api.instagram.com/oauth/authorize/?client_id='
                  + in_client_id + '&response_type=code'
                  +'&redirect_uri='+ in_redirect_uri ,
    in_redirect_uri_telegram = 'https://secretive-shoemaker.glitch.me/authtelegram',
    in_auth_url_telegram = 'https://api.instagram.com/oauth/authorize/?client_id='
                    + in_client_id + '&response_type=code'
                    +'&redirect_uri='+ in_redirect_uri_telegram +"?telegramId=" ; 


var db_user = process.env.MONGO_DB_USER,
    db_password = process.env.MONGO_DB_PASS,
    db_uri = 'mongodb://'
             + db_user + ':'
             + db_password + '@ds117158.mlab.com:17158/mylinks';


module.exports = {
  db: {
    uri: db_uri
  },
  instagram: {
    client_id: in_client_id,
    client_secret: in_client_secret,
    auth_url: in_auth_url,
    redirect_uri: in_redirect_uri,
    auth_url_telegram : in_auth_url_telegram,
    redirect_uri_telegram : in_redirect_uri_telegram
  },
  main_page : {
    link: "https://secretive-shoemaker.glitch.me/main.html"
  }
};