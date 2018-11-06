const roasts = require('../assets/roast.json');

exports.run = async function(client, message, args) {

  if(args[0] == "help" || args.length == 0){
    message.reply(`\`\`\`css\nUsage: ${message.settings.prefix}roast <user>\n\`\`\``);
    return;
  }
  let member = message.mentions.members.first();

  return message.channel.send(`${member}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'roast',
  category: "Misc",
  description: 'roast a user',
  usage: 'roast [user]'
};
