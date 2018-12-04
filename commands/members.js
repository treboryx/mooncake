const check = require('../util/functions.js');

exports.run = async function(client, message, args) {
  message.channel.send(`This discord server has ${message.guild.memberCount} members, ${check.checkBots(message.guild)} of which are bots.`);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'members',
  category: 'Misc',
  description: 'Guild member count',
  usage: 'members'
};
