const Discord = require('discord.js');
const errors = require('../util/errors.js');

exports.run = async function(client, message, args) {

  const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission('BAN_MEMBERS')) return errors.noPerms(message, 'BAN_MEMBERS');
  if (args[0] == 'help' || args.length == 0) {
    message.reply(`Usage: ${message.settings.prefix}ban [user] [reason]`);
    return;
  }
  const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return errors.cantfindUser(message.channel);
  if (bUser.id === client.user.id) return errors.botuser(message);
  const bReason = args.join(' ').substring(22);
  if (!bReason) return errors.noReason(message.channel);
  if (bUser.hasPermission('MANAGE_MESSAGES')) return errors.equalPerms(message, bUser, 'MANAGE_MESSAGES');

  const banEmbed = new Discord.RichEmbed()
    .setColor('#bc0000')
    .addField('User Banned', `${bUser} with ID ${bUser.id}`)
    .addField('Banned By', `<@${message.author.id}> with ID ${message.author.id}`)
    .addField('Banned In', message.channel)
    .addField('Time', message.createdAt)
    .addField('Reason', bReason)
    .setFooter(`By ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp();

  const incidentchannel = message.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!incidentchannel) return;

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'ban',
  category: 'Moderation',
  description: 'BAN HAMMER',
  usage: 'ban [name] [reason/optional]'
};
