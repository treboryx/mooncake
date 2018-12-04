const Discord = require("discord.js");

module.exports = async (client, guild, user) => {

  const settings = guild.client.getGuildSettings(guild);

  const logs = guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!logs) return;

  const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());
  const userExec = entry.executor;

  if (!entry.reason) {
    var memberBanned = new Discord.RichEmbed()
      .setColor("#FF470F")
      .setAuthor("Member Banned",`${user.displayAvatarURL}`)
      .setDescription(`User: ${user} ${user.tag}\nUID: ${user.id}`)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp();
    if (settings.log_everything === "true") {
      return logs.send(memberBanned);
    } else if (settings.guildUpdateBanAddRemove === "true") {
      return logs.send(memberBanned);
    } else {
      return;
    }
  } else {
    var memberBannedReason = new Discord.RichEmbed()
      .setColor("#FF470F")
      .setAuthor("Member Banned",`${user.displayAvatarURL}`)
      .setDescription(`User: ${user} ${user.tag}\nUID: ${user.id}\nReason: \`${entry.reason}\``)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp();
    if (settings.log_everything === "true") {
      return logs.send(memberBannedReason);
    } else if (settings.guildUpdateBanAddRemove === "true") {
      return logs.send(memberBannedReason);
    } else {
      return;
    }
  }
};
