const Discord = require('discord.js');

exports.run = async function(client, message, args) {
  message.delete();
  const embed = new Discord.RichEmbed()
    .setAuthor('POLL', message.guild.iconURL)
    .setColor('RANDOM')
    .setDescription(args)
    .setFooter('React with 👍 if you agree or 👎 if you don\'t');
  const m = await message.channel.send(embed);
  message.channel.fetchMessage(m).then(msg => msg.react('👍'));
  message.channel.fetchMessage(m).then(msg => msg.react('👎'));


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'vote',
  category: 'Misc',
  description: 'Voting command',
  usage: 'vote'
};
