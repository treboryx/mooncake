exports.run = async function(client, message, args) {
  let emojis;
  if(message.guild.emojis.size === 0) emojis = "There are no custom emojis on this server."
    else emojis = `${message.guild.name}'s Custom Emojis: \n ${message.guild.emojis.map(e => e).join(' ')}`;
message.channel.send(emojis);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'emojis',
  category: "Misc",
  description: 'Returns all custom emojis in the guild',
  usage: 'emojis'
};
