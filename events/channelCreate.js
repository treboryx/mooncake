const Discord = require("discord.js");
const colors = require("../assets/colorsrandom.json");

module.exports = async (client, channel) => {

  const settings = client.getGuildSettings(channel.guild);

  const logs = channel.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!logs) return;

  const entry = await channel.guild.fetchAuditLogs({type: "CHANNEL_CREATE"}).then(audit => audit.entries.first());
  let user = "";
  if (entry.createdTimestamp > (Date.now() - 5000)) {
    user = entry.executor;
  } else {
    user = message.author;
  }

  const color = colors[Math.floor(Math.random() * colors.length)];

  const channelCreated = new Discord.RichEmbed()
    .setAuthor(`${channel.guild.name}`, channel.guild.iconURL)
    .setDescription(`❯ **Channel created: ${channel}\n❯ Type: ${channel.type}**`)
    .setColor("#23D160")
    .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
    .setTimestamp();

  if (settings.log_everything === "true") {
    return logs.send(channelCreated);
  } else if (settings.channelCreateDeleteUpdate === "true") {
    return logs.send(channelCreated);
  } else {
    return;
  }
};
