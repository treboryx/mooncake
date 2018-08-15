const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

module.exports = async (client, message) => {

  if (message.author.bot) return;
  
  const settings = client.getGuildSettings(message.guild);

  const logs = message.guild.channels.find("name", settings.logs_channel);
  if(!logs) return;

  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel === message.channel
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor
  } else {
    user = message.author
  }

  const color = colors[Math.floor(Math.random() * colors.length)];

  const deletedMessage = new Discord.RichEmbed()
     .setTitle("Message Deleted")
     .setDescription(`Message sent by ${message.author} deleted in ${message.channel}\n\n`)
     .addField("Message:", "`" + message.content + "`")
     .addField("Deleted by:", user)
     .setColor(color)
     .setFooter(`ID: ${message.id}`)
     .setTimestamp()
 logs.send(deletedMessage);
};
