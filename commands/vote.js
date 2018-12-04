const Discord = require('discord.js');

exports.run = async function(client, message, args) {
  if (!args) return message.author.send('You can\'t create an empty poll');
  message.delete();
  const embed = new Discord.RichEmbed()
    .setAuthor(`POLL Started by ${message.author.tag}`, message.author.avatarURL)
    .setColor('RANDOM')
    .setDescription(`${args.join(' ')}`)
    .setFooter('React with 👍 if you agree or 👎 if you don\'t');
  const m = await message.channel.send(embed);
  message.channel.fetchMessage(m).then(msg => msg.react('👍'));
  message.channel.fetchMessage(m).then(msg => msg.react('👎'));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['poll'],
  permLevel: 'User'
};

exports.help = {
  name: 'vote',
  category: 'Misc',
  description: 'Voting command',
  usage: 'vote'
};
