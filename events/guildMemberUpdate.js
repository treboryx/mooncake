const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')


module.exports = async (client, oldMember, newMember) => {

  const settings = oldMember.client.getGuildSettings(oldMember.guild);

  const logs = newMember.guild.channels.find(channel => channel.name === settings.logs_channel);
  if(!logs) return;

  const entry = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_UPDATE'}).then(audit => audit.entries.first())
  let user = entry.executor
  
  const entryRoles = await oldMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
  let userRoles = entryRoles.executor
    // if (entry.extra.channel.id === oldMember.channel.id
      // if (entry.target.id === entry.author.id
  //     if (entry.createdTimestamp > (Date.now() - 5000)) {
  //   user = entry.executor
  // } else {
  //   user = oldMember.author
  // }

  const color = colors[Math.floor(Math.random() * colors.length)];

  if(oldMember.roles === newMember.roles) return;
  if(oldMember.roles === newMember.roles && (oldMember.nickname === newMember.nickname)) return;

  if(oldMember.roles !== newMember.roles && (oldMember.nickname === newMember.nickname)) {

        const memberUpdated = new Discord.RichEmbed()
       .setAuthor("Member Updated", newMember.avatarURL)
       .setDescription(`${newMember}`)
       .setColor(newMember.displayHexColor)
       .addField(`Before:`, oldMember.roles.map(e => e).join(','))
       .addField(`After:`, newMember.roles.map(e => e).join(','))
       .setFooter(`By ${userRoles.username}#${userRoles.discriminator}`, userRoles.avatarURL)
       .setTimestamp()
    if (settings.log_everything === "true") {
             logs.send(memberUpdated);
           } else if (settings.guildMemberAddRemoveUpdate === "true") {
             logs.send(memberUpdated);
           } else {
             return;
           }
  } else {

    if(oldMember.nickname !== newMember.nickname) {
      if(oldMember.nickname === null) {

            const memberUpdated = new Discord.RichEmbed()
           .setAuthor("Nickname Changed", newMember.avatarURL)
           .setDescription(`❯ ${newMember}\n❯ **Before:** None\n❯ **After:** ${newMember.nickname}`)
           .setColor(newMember.displayHexColor)
           .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
           .setTimestamp()
           if (settings.log_everything === "true") {
                    logs.send(memberUpdated);
                  } else if (settings.guildMemberAddRemoveUpdate === "true") {
                    logs.send(memberUpdated);
                  } else {
                    return;
                  }
      } else if(newMember.nickname === null) {

            const memberUpdated = new Discord.RichEmbed()
           .setAuthor("Nickname Changed", newMember.avatarURL)
           .setDescription(`❯ ${newMember}\n❯ **Before:** ${oldMember.nickname}\n❯ **After:** None`)
           .setColor(newMember.displayHexColor)
           .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
           .setTimestamp()

           if (settings.log_everything === "true") {
                    logs.send(memberUpdated);
                  } else if (settings.guildMemberAddRemoveUpdate === "true") {
                    logs.send(memberUpdated);
                  } else {
                    return;
                  }

      } else {

            const memberUpdated = new Discord.RichEmbed()
           .setAuthor("Nickname Changed", newMember.avatarURL)
           .setDescription(`❯ ${newMember}\n❯ **Before:** ${oldMember.nickname}\n❯ **After:** ${newMember.nickname}`)
           .setColor(newMember.displayHexColor)
           .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
           .setTimestamp()

           if (settings.log_everything === "true") {
                    logs.send(memberUpdated);
                  } else if (settings.guildMemberAddRemoveUpdate === "true") {
                    logs.send(memberUpdated);
                  } else {
                    return;
                  }
      }

    }
  }

};
