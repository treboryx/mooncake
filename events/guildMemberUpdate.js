const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')


module.exports = async (client, oldMember, newMember) => {
  

  const settings = oldMember.client.getGuildSettings(oldMember.guild);

  const logs = oldMember.guild.channels.find("name", settings.logs_channel);
  if(!logs) return;

  const entry = await oldMember.guild.fetchAuditLogs({type: 'MANAGE_ROLES'}).then(audit => audit.entries.first())
  let user = ""
    // if (entry.extra.channel.id === oldMember.channel.id
      // if (entry.target.id === entry.author.id
      if (entry.createdTimestamp > (Date.now() - 5000)) {
    user = entry.executor
  } else {
    user = oldMember.author
  }

  const color = colors[Math.floor(Math.random() * colors.length)];

  if(oldMember.roles === newMember.roles && (oldMember.nickname === newMember.nickname)) return;
  const memberUpdated = new Discord.RichEmbed()
     .setTitle("Member Updated") // displayAvatarURL to be added
     .setColor(color)
     .addField(`Previous Roles:`, oldMember.roles.map(e => e).join(','))
     .addField(`New Roles:`, newMember.roles.map(e => e).join(','))
     .addField("Updated by:", user)
     .setFooter(`ID: ${newMember.id}`)
     .setTimestamp()
     logs.send(memberUpdated);
};
