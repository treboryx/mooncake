exports.run = async function(client, message, args) {
    message.channel.send('( ͡° ͜ʖ ͡° )')


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'lenny',
  category: "Miscellaneous",
  description: 'Lenny face',
  usage: 'lenny'
};
