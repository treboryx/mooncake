exports.run = function(client, message, args) {
  if (!args.length) return message.channel.send('Can\'t be empty.');
  message.channel.send(`(( ${args.join(' ')} ))`);
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Administrator'
};

exports.help = {
  name: 'ooc',
  category: 'Misc',
  description: 'OOCly, and I\'m saying this OOCly',
  usage: 'ooc'
};
