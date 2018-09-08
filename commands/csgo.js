const errors = require("../util/errors.js");
const Discord = require("discord.js");
var request = require('request');
var cheerio = require('cheerio');

function getStatData(location, message , $){

  var selector = $('.stats-stat .value').eq(location).text();

  var stat_array = $.parseHTML(selector);

  var stat = 0;

  // if(stat_array == null || stat_array.length == 0){
  //   return message.channel.send("Invalid User");
  // }else{
    stat = stat_array[0].data;
  // }

  return stat;
}



exports.run = async function(client, message, args) {



  if(!args[0]){
    return message.channel.send("Please Enter a valid STEAMID64 or custom url");
  }

  var UR_L = "http://csgo.tracker.network/profile/" + args[0];



          request(UR_L, function(err, resp, body){

              $ = cheerio.load(body);

              var KD = getStatData(0, message, $);
              var WIN = getStatData(1, message, $);
              var WINS = getStatData(3, message, $);
              var HS = getStatData(4, message, $);
              var MONEY = getStatData(5, message, $);
              var SCORE = getStatData(6, message, $);
              var KILLS = getStatData(7, message, $);
              var DEATHS = getStatData(8, message, $);
              var MVP = getStatData(9, message, $);
              var BS = getStatData(13, message, $);
              var BD = getStatData(14, message, $);
              var HR = getStatData(15, message, $);
              var PLAYTIME = getStatData(10, message, $);
              var RP = getStatData(11, message, $);
              var RW = getStatData(12, message, $);

              var STAT = new Discord.RichEmbed()

              .setTitle("__***CSGO Stats***__")
              .setURL(UR_L)
              .setColor('RANDOM')
              .addField('K/D', KD, true)
              .addField('WINS', WINS, true)
              .addField('Win%', WIN, true)
              .addField('Score', SCORE, true)
              .addField('Kills', KILLS, true)
              .addField('Deaths', DEATHS, true)
              .addField('Rounds Played', RP, true)
              .addField('Rounds Won', RW, true)
              .addField('Bombs Set', BS, true)
              .addField('Bombs Defused', BD, true)
              .addField('Headshots', HS, true)
              .addField('Money Earned', MONEY, true)
              .addField('Hostages Rescued', HR, true)
              .addField('Playtime', PLAYTIME, true)
  message.channel.send(STAT);
})

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'csgo',
  category: "Miscellaneous",
  description: 'Display CSGO Stats',
  usage: 'csgo [steamID]'
};
