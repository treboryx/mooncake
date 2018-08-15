exports.run = function(client, message, args) {
  var args = message.content.split(/[ ]+/);
  if(message.member.hasPermission("ADMINISTRATOR")) {
    if(args.length === 1) {
      message.channel.send('You did not define a argument');
    } else {
      message.delete();
      message.channel.send(args.join(" ").substring(5));
    }
  } else {
    message.channel.send('Not authorized');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: 'say',
  category: "Miscellaneous",
  description: 'Make the bot your b*tch',
  usage: 'say'
};
