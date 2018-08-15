const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = (client, member) => {


  const settings = member.client.getGuildSettings(member.guild);

  const logs = member.guild.channels.find("name", settings.logs_channel);
  if(!logs) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  var memberJoined = new Discord.RichEmbed()
  .setColor('#23D160')
  .setAuthor(`Member joined`,`${member.user.displayAvatarURL}`)
  .setDescription(`${member.user} ${member.user.tag}`)
  .setFooter(`ID: ${member.id}`)
  .setTimestamp()
  logs.send(memberJoined);

  if (settings.welcome_enabled !== "true") return;


  const welcome_message = settings.welcome_message.replace("{{user}}", member.user);

  member.guild.channels.find("name", settings.welcome_channel).send(welcome_message).catch(console.error);
};
