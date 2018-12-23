const Discord = require('discord.js');
const colors = require('../assets/colorsrandom.json');

module.exports = (client, member) => {
  if (!member) return;

  if (member.displayName === /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g) member.ban();
  const settings = member.client.getGuildSettings(member.guild);

  const logs = member.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!logs) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  var memberJoined = new Discord.RichEmbed()
    .setColor('#23D160')
    .setAuthor('Member joined',`${member.user.displayAvatarURL}`)
    .setDescription(`${member.user} ${member.user.tag}`)
    .setFooter(`ID: ${member.id}`)
    .setTimestamp();

  if (settings.log_everything === 'true') {
    logs.send(memberJoined);
  } else if (settings.guildMemberAddRemoveUpdate === 'true') {
    logs.send(memberJoined);
  } else {
    return;
  }

  if (settings.welcome_enabled !== 'true') return;


  const welcome_message = settings.welcome_message.replace('{{user}}', member.user);

  member.guild.channels.find(channel => channel.name === settings.welcome_channel).send(welcome_message).catch(console.error);
};
