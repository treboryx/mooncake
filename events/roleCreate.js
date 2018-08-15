const Discord = require("discord.js");

module.exports = async (client, role) => {

  const settings = client.getGuildSettings(role.guild);

  const logs = role.guild.channels.find("name", settings.logs_channel);
  if(!logs) return;

    var roleCreated = new Discord.RichEmbed()
    .setAuthor(`${role.guild.name}`, role.guild.iconURL)
    .setColor('00AE86')
    .setDescription(`Role Created: ${role.name}`)
    .setFooter(`ID: ${role.id}`)
    .setTimestamp()
    return logs.send(roleCreated);

};
