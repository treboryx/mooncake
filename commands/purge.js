const Discord = require("discord.js");

exports.run = async function(client, message, args) {
  if(message.member.hasPermission("ADMINISTRATOR")) {

    const deleteCount = parseInt(args.join(' '));
    message.channel.fetchMessages({
      limit: deleteCount
    }).then(messages => message.channel.bulkDelete(messages));

    const settings = client.getGuildSettings(message.guild);
    let purgeChannel = message.guild.channels.find("name", settings.logs_channel);
    if(!purgeChannel) return;

    let purgeEmbed = new Discord.RichEmbed()
   .setTitle("Bulk Delete")
   .setColor("FF0000")
   .setDescription(`${deleteCount} messages deleted in ${message.channel}`)
   .setTimestamp()

   purgeChannel.send(purgeEmbed);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Administrator"
};

exports.help = {
  name: 'purge',
  category: "Moderation",
  description: 'purges a desired number of messages, up to 100',
  usage: 'purge [number]'
};
