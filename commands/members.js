const checkBots = require('../util/functions.js')
const check = require('../util/functions.js')

exports.run = async function(client, message, args) {
    message.channel.send(`This discord server has ${check.checkMembers(message.guild)} members and ${check.checkBots(message.guild)} bots.`);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'members',
  category: "Miscellaneous",
  description: 'Guild member count',
  usage: 'members'
};
