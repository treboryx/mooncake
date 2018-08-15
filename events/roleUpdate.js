const Discord = require("discord.js");

module.exports = async (client, oldRole, newRole) => {

  const settings = client.getGuildSettings(newRole.guild);

  const logs = newRole.guild.channels.find("name", settings.logs_channel);
  if(!logs) return;


    var roleUpdated = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name}`, newRole.guild.iconURL)
    .setColor('00AE86')
    .setTitle('Role Updated')
    .setDescription(`New Name: **${newRole.name}** Old Name: **${oldRole.name}**`)
    .setFooter(`ID: ${newRole.id}`)
    .setTimestamp()
    return logs.send(roleUpdated);

};
