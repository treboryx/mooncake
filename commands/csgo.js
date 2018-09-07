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
              var HS = getStatData(4, message, $);
              var MONEY = getStatData(5, message, $);
              var SCORE = getStatData(6, message, $);
              var KILLS = getStatData(7, message, $);
              var DEATHS = getStatData(8, message, $);
              var MVP = getStatData(9, message, $);
              var BS = getStatData(13, message, $);
              var BD = getStatData(14, message, $);
              var HR = getStatData(15, message, $);

              var STAT = new Discord.RichEmbed()

              .setTitle("__***CSGO Stats***__")
              .setURL(UR_L)

              .addField("------------------------------------",
                        "Total KD: " + "__**" + KD + "**__" + "\n" +
                        "Total Win%: " + "__**" + WIN + "**__" + "\n" +
                        "Total MVPs: " + "__**" + MVP + "**__" + "\n" +
                        "Total Score: " + "__**" + SCORE + "**__" + "\n" +
                        "Total Kills: " + "__**" + KILLS + "**__" + "\n" +
                        "Total Deaths: " + "__**" + DEATHS + "**__" + "\n" +
                        "Total Bombs Set: " + "__**" + BS + "**__" + "\n" +
                        "Total Bombs Defused: " + "__**" + BD + "**__" + "\n" +
                        "Total Headshots: " + "__**" + HS + "**__" + "\n" +
                        "Total Money Earned: " + "__**" + MONEY + "**__" + "\n" +
                        "Total Hostages Rescued: " + "__**" + HR + "**__" + "\n" +
                        "------------------------------------\n", true)

                .setColor("0x#FF0000")
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
