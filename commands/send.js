exports.run = async function(client, message, args) {
    
  const user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) return message.reply('You didn\'t mention a user');
  const msgContent = args.slice(1).join(' ');
  user.send(msgContent);
    
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['s'],
  permLevel: 'Bot Owner'
};
  
exports.help = {
  name: 'send',
  category: 'Owner',
  description: 'Send message to user.',
  usage: 'send'
};
  