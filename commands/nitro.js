const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = async function(client, message, args) {
  message.delete();
  const embed = new Discord.RichEmbed()
    .setAuthor('Discord Nitro', 'https://i.imgur.com/DKaY8fV.jpg', 'https://discordapp.com/nitro')
    .setThumbnail('https://i.imgur.com/DKaY8fV.jpg')
    .setColor(0x8395D3)
    .setTimestamp()
    .setDescription(stripIndents`
				This message can only be viewed by users with Discord Nitro.
				[More Information](https://discordapp.com/nitro)
			`);
  return message.channel.send({embed});


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'nitro',
  category: 'Misc',
  description: 'You must have Discord Nitro.',
  usage: 'nitro'
};
