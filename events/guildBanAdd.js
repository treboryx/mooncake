const Discord = require("discord.js");

module.exports = async (member, guild, user) => {

    const settings = member.client.getGuildSettings(member.guild);

    const logs = member.guild.channels.find("name", settings.logs_channel);
    if(!logs) return;

    var memberBanned = new Discord.RichEmbed()
    .setColor('FF0000')
    .setAuthor(`Member Banned`,`${user.displayAvatarURL}`)
    .setDescription(`${user} ${user.tag}`)
    .setFooter(`ID: ${user.id}`)
    .setTimestamp()
    return logs.send(memberBanned);

};
