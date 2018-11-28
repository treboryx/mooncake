const quotes = require('../assets/quotes.json');
const Discord = require('discord.js');
const colors = require('../assets/colorsrandom.json');
const staticColor = require('../assets/colors.json');

exports.run = async function(client, message, args) {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  // return message.channel.send(`${quote.quote} - _${quote.author}_`);

  // const color = colors[Math.floor(Math.random() * colors.length)];
  const embed = new Discord.RichEmbed()

    .setColor(staticColor.pink)
    .addField(`${quote.quote}`, `- _${quote.author}_`);
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Owner'
};

exports.help = {
  name: 'quote',
  category: 'Misc',
  description: 'Returns a random quote',
  usage: 'quote'
};
