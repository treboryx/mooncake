exports.run = async function(client, message, args) {
  message.channel.send('( ͡° ͜ʖ ͡° )');


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'lenny',
  category: 'Misc',
  description: 'Lenny face',
  usage: 'lenny'
};
