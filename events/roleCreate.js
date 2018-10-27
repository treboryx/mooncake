const Discord = require("discord.js");

module.exports = async (client, role) => {

  const settings = client.getGuildSettings(role.guild);

  const logs = role.guild.channels.find(channel => channel.name === settings.logs_channel);
  if(!logs) return;

  const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
  let user = entry.executor

    var roleCreated = new Discord.RichEmbed()
    .setAuthor(`${role.guild.name}`, role.guild.iconURL)
    .setColor(role.color)
    .setDescription(`❯ **Role Created:** ${role.name}\n❯ by: ${user}`)
    .setFooter(`ID: ${role.id}`)
    .setTimestamp()

if (settings.log_everything === "true") {
        return logs.send(roleCreated);
      } else if (settings.roleCreateDeleteUpdate === "true") {
        return logs.send(roleCreated);
      } else {
        return;
      }
};
