const Discord = require("discord.js");

module.exports = async (member, guild, user) => {

    const settings = member.client.getGuildSettings(member.guild);

    if (settings.guildUpdateBanAddRemove !== "true") return;

    const logs = member.guild.channels.find(channel => channel.name === settings.logs_channel);
    if(!logs) return;

    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first())
    let userExec = entry.executor

    var memberUnbanned = new Discord.RichEmbed()
    .setColor('00FF00')
    .setAuthor(`Member Unbanned`,`${user.displayAvatarURL}`)
    .setDescription(`${user} ${user.tag}\nUID: ${user.id}`)
    .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
    .setTimestamp()
    return logs.send(memberUnbanned);

};
