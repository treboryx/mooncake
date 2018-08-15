exports.run = async function(client, message, args) {
  message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.react('👍'))
  message.channel.fetchMessage(message.channel.lastMessageID).then(msg => msg.react('👎'))


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'vote',
  category: "Miscellaneous",
  description: 'Voting command',
  usage: 'vote'
};
