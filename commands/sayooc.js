exports.run = function(client, message, args) {
  if(!args.length) return message.channel.send("Can't be empty.");
  message.channel.send(`(( [OOCLY -- AND I'M SAYING THIS OOCLY]: ${args.join(" ")} ))`);
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oocs'],
  permLevel: 'Administrator'
};

exports.help = {
  name: 'oocscott',
  category: 'Misc',
  description: 'OOCly, and I\'m saying this OOCly',
  usage: 'oocscott'
};
