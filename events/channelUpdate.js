const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = async (client, oldChannel, newChannel) => {

  const settings = client.getGuildSettings(oldChannel.guild);

  if (settings.channelCreateDeleteUpdate !== "true") return;

  const logs = oldChannel.guild.channels.find(channel => channel.name === settings.logs_channel);
  if(!logs) return;

  const entry = await oldChannel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
  let user = ""
  if (entry.createdTimestamp > (Date.now() - 5000)) {
    user = entry.executor
  } else {
    user = entry.executor
  }

  if(oldChannel.name === newChannel.name) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  const channelCreated = new Discord.RichEmbed()
     .setAuthor(`${oldChannel.guild.name}`, oldChannel.guild.iconURL)
     .setDescription(`❯ **Channel updated:** #${oldChannel.name} ==> ${newChannel}`)
     .setColor(color)
     .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
     .setTimestamp()
     logs.send(channelCreated);
};
