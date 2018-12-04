const Discord = require('discord.js');

exports.run = async function(client, message) {

  const embed = new Discord.RichEmbed()
    .setAuthor(client.user.tag)
    .setColor(0xD353EF)
    .setThumbnail(client.user.avatarURL)
    .setDescription('Invite: [Click Me!](https://discordapp.com/oauth2/authorize?&client_id=471737688203198464&scope=bot&permissions=8)');

  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'about',
  category: 'Misc',
  description: 'Shows information about the bot',
  usage: 'about'
};
