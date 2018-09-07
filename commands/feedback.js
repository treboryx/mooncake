const func = require('../util/functions.js')
const Discord = require('discord.js')

exports.run = async function(client, message, args) {

      if(args.length === 0) return message.reply("Give me more details.")

      var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`Bug report`,`${message.guild.iconURL}`)
        .addField("Details", args.join(" "))
        .setFooter(`Submitted by ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .setTimestamp()

        client.channels.get("323596194267922433").send(embed);

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
