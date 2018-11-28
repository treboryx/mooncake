exports.run = async function(client, message, args) {

  var result = message.content.split(' ').slice(1, 2)[0];
  if (!result) {
    result = 'online';
  }
  client.user.setStatus(result);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Owner'
};

exports.help = {
  name: 'setstatus',
  category: 'Owner',
  description: 'Sets the bot\'s status',
  usage: 'setstatus [online/idle/dnd/invisible]'
};
