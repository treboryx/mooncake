const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = async (client, message, newMsg) => {

  if (message.author.bot) return;

  const settings = client.getGuildSettings(message.guild);

  if (settings.messageDeleteUpdate !== "true") return;

  const logs = message.guild.channels.find(channel => channel.name === settings.logs_channel);
  if(!logs) return;
  if (message.content === newMsg.content) return;

  const color = colors[Math.floor(Math.random() * colors.length)];

  const editedMessage = new Discord.RichEmbed()
     .setTitle("Message Edited")
     .setDescription(`Message sent by ${message.author} edited in ${message.channel}\n\n`)
     .addField("Old Message:", "`" + message.content + "`")
     .addField("New Message:", "`" + newMsg.content + "`")
     .setColor(color)
     .setFooter(`ID: ${message.id}`)
     .setTimestamp()
 logs.send(editedMessage);

};
