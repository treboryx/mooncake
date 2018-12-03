const check = require('../util/functions.js');

exports.run = async function(client, message, args) {
  message.channel.send(`This discord server has ${guild.members.filter(member => !member.user.bot).size} members and ${check.checkBots(message.guild)} bots.`);


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
