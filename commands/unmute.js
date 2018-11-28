const Discord = require('discord.js');
const ms = require('ms');

exports.run = async function(client, message, args) {

  const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No can do.');
  if (args[0] == 'help' || args.length == 0) {
    message.reply(`Usage: ${message.settings.prefix}unmute <user>`);
    return;
  }
  const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply('You didn\'t mentioned a user');

  const muterole = message.guild.roles.find(role => role.name === 'muted');


  const incidentschannel = message.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!incidentschannel) return;

  const muteembed = new Discord.RichEmbed()
    .setColor('#EEB231')
    .setDescription(`User unmuted: ${tomute}`)
    .setFooter(`By ${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
    .setTimestamp();
  incidentschannel.send(muteembed);


  await (tomute.addRole(muterole.id));

  tomute.removeRole(muterole.id);
  message.channel.send(`<@${tomute.id}> has been unmuted.`);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'unmute',
  category: 'Moderation',
  description: 'Unmute someone',
  usage: 'unmute [name]'
};
