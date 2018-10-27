const Discord = require("discord.js");

module.exports = async (member, guild, user) => {

    const settings = member.client.getGuildSettings(member.guild);

    const logs = member.guild.channels.find(channel => channel.name === settings.logs_channel);
    if(!logs) return;

    const entry = await role.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
    let userExec = entry.executor

    var memberBanned = new Discord.RichEmbed()
    .setColor('#FF470F')
    .setAuthor(`Member Banned`,`${user.displayAvatarURL}`)
    .setDescription(`User: ${user} ${user.tag}\nUID: ${user.id}`)
    .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
    .setTimestamp()

  if (settings.log_everything === "true") {
        logs.send(memberBanned);
      } else if (settings.guildUpdateBanAddRemove === "true") {
        logs.send(memberBanned);
      } else {
        return;
      }
};
