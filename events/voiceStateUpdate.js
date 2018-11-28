const Discord = require('discord.js');
const colors = require('../assets/colorsrandom.json');

module.exports = async (client, oldMember, newMember) => {

  const settings = client.getGuildSettings(oldMember.guild);

  const logs = oldMember.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!logs) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {

    const editedMessage = new Discord.RichEmbed()
      .setDescription(`\`${newMember.user.username}#${newMember.user.discriminator}\` joined voice channel \`${newUserChannel.name}\``)
      .setColor(color)
      .setTimestamp();
    if (settings.log_everything === 'true') {
      return logs.send(editedMessage);
    } else if (settings.voiceStateUpdate === 'true') {
      return logs.send(editedMessage);
    } else {
      return;
    }

  } else if (newUserChannel === undefined) {

    const editedMessage = new Discord.RichEmbed()
      .setDescription(`\`${newMember.user.username}#${newMember.user.discriminator}\` left voice channel \`${oldUserChannel.name}\``)
      .setColor(color)
      .setTimestamp();
    if (settings.log_everything === 'true') {
      return logs.send(editedMessage);
    } else if (settings.voiceStateUpdate === 'true') {
      return logs.send(editedMessage);
    } else {
      return;
    }

  } else if (oldUserChannel !== undefined && newUserChannel !== undefined) {

    const editedMessage = new Discord.RichEmbed()
      .setDescription(`\`${newMember.user.username}#${newMember.user.discriminator}\` switched voice channel \`${oldUserChannel.name}\` ==> \`${newUserChannel.name}\``)
      .setColor(color)
      .setTimestamp();
    if (settings.log_everything === 'true') {
      return logs.send(editedMessage);
    } else if (settings.voiceStateUpdate === 'true') {
      return logs.send(editedMessage);
    } else {
      return;
    }


  } else {
    return;

  }

};
