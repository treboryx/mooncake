const Discord = require('discord.js');

module.exports = async (client, guild, user) => {

  const settings = guild.client.getGuildSettings(guild);

  const logs = guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!logs) return;

  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first());
  const userExec = entry.executor;

  var memberUnbanned = new Discord.RichEmbed()
    .setColor('00FF00')
    .setAuthor('Member Unbanned',`${user.displayAvatarURL}`)
    .setDescription(`${user} ${user.tag}\nUID: ${user.id}`)
    .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
    .setTimestamp();

  if (settings.log_everything === 'true') {
    return logs.send(memberUnbanned);
  } else if (settings.guildUpdateBanAddRemove === 'true') {
    return logs.send(memberUnbanned);
  } else {
    return;
  }
};
