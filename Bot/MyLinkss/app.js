const Telegraf = require('telegraf');
const TelegrafFlow = require('telegraf-flow')
const { WizardScene } = TelegrafFlow 

const {
    Extra,
        Markup
} = require('telegraf');

//const config = require('./config');
//const dataService = require('./dataService');

const bot = new Telegraf(process.env.MYLINKSS_TELEGRAM_TOKEN);

const url = "https://secretive-shoemaker.glitch.me/"; 

const helpMsg = `Command reference:
/login - To login to your instagram acc
/setlink - To set your links 
/getlinks - To retrieve all your links
/help - Show information about the bot
/about - Show about bot`;

const aboutMsg = "This bot was created for Hack&Roll 2018, Team SleepyHeads.";

const setlinksMsg = `Please format it like this E.g.
<Title> - <URL>
FaceBook - https://www.facebook.com/MrDanielKhoo`;

const getlinksMsg = "Retrieving all your links...";

function userString(ctx) {
    return JSON.stringify(ctx.from.id == ctx.chat.id ? ctx.from : {
from: ctx.from, 
chat: ctx.chat
});
}

function logMsg(ctx) {
    var from = userString(ctx);
    console.log('<', ctx.message.text, from)
}

function logOutMsg(ctx, text) {
    console.log('>', {
id: ctx.chat.id
}, text);
} 

bot.command('about', ctx => {
        logMsg(ctx);
        logOutMsg(ctx, aboutMsg);
        ctx.reply(aboutMsg);
        });

bot.command('start', ctx => {
        logMsg(ctx);
        var m = "Hello, I'm your MyLinks bot, simply use /help to look at the command reference";
        ctx.reply(m);
        logOutMsg(ctx, m);
        setTimeout(() => { 
                logOutMsg(ctx)
                }, 50);
        });

bot.command('help', ctx => {
        logMsg(ctx);
        logOutMsg(ctx, helpMsg);
        ctx.reply(helpMsg);
        });

bot.command('login', ctx => {
    logMsg(ctx);
    var keyboard = []
    var kx = [Markup.urlButton("Instagram", url + 'login/'  + ctx.chat.id)]
    keyboard.push(kx)
    ctx.replyWithMarkdown("Please click the button below to login :)",Markup.inlineKeyboard(keyboard).extra())
    var m = "Okay you are logged in. Please use /setlink to set your links :)";
    ctx.reply(m);
    logOutMsg(ctx, m);
});

bot.on('login', ctx => {
    const result = [] 
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)
});

const wiz = new WizardScene('wiz', (ctx) => {
    ctx.reply(setlinksMsg)
    ctx.flow.wizard.next()
 },
(ctx) => {
    var validUrl = require('valid-url'); 
    params = ctx.message.text.split(" - ");
    console.log("data1",params[1])
    console.log("data0",params[0])
    if (validUrl.isUri(params[1])) {
        var formData = {
            user_id: ctx.chat.id,
            url_title: params[0],
            url_link: params[1]
        };
        console.log(formData);
        var request = require('request');
        request.post({url: url + 'telegram/createlinks/' +ctx.chat.id, form: formData})
        
        ctx.reply('Okay, link has been added.');
    } else {
        ctx.reply('Sorry, link is not valid. Run /setlink & follow the format :)');
    }
    ctx.flow.leave()
});

const flow = new TelegrafFlow()
flow.register(wiz) 
bot.use(Telegraf.session())
bot.use(flow.middleware())
bot.command('setlink', (ctx) => ctx.flow.enter('wiz'))

bot.command('getlinks', (ctx) => {
    var request = require('request')
    var options = {
        url: url + 'telegram/getlinks/'+ctx.chat.id,
        method: 'DELETE',
    }
    ctx.reply(getlinksMsg)
    request.post(options, function (error, response, body) {
        var json = JSON.parse(body);
        console.log(json)

        var keyboard = []
       
        for (var i = 0; i < json.length; i++) {
            var kx = [Markup.urlButton(json[i]['url_title'], json[i]['url_link'])];
            keyboard.push(kx)
        }
        ctx.replyWithMarkdown("Please click the button below to access the weblinks :)",Markup.inlineKeyboard(keyboard).extra())
    })
})

bot.startPolling();
