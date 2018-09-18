const func = require('../util/functions.js')
const Discord = require('discord.js')
const cooldown = new Set();

exports.run = async function(client, message, args) {

  if (cooldown.has(message.author.id)) {
       message.reply("Oops! Try again in 1 minute.")
} else {

  if(args.length === 0) return message.reply("Give me more details.")
  else {
    message.reply("Thank you for your input!");
  }

  var embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setAuthor(`Bug report`,`${message.guild.iconURL}`)
    .addField("Details", args.join(" "))
    .setFooter(`Submitted by ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
    .setTimestamp()

    client.channels.get("323596194267922433").send(embed);
   cooldown.add(message.author.id);
   setTimeout(() => {
     cooldown.delete(message.author.id);
   }, 60000);
 }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bugreport', 'suggest'],
  permLevel: "User"
};

exports.help = {
  name: 'feedback',
  category: "Miscellaneous",
  description: 'Report an issue, or suggest a feature.',
  usage: 'feedback'
};
