const Discord = require("discord.js");
const errors = require("../util/errors.js");


exports.run = async function(client, message, args) {

  const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
  if (args[0] == "help" || args.length == 0) {
    message.reply(`Usage: ${message.settings.prefix}kick [user] [reason]`);
    return;
  }

  const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return errors.cantfindUser(message.channel);
  const kReason = args.join(" ").slice(19);
  if (!kReason) return errors.noReason(message.channel);
  if (kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");
  const kickEmbed = new Discord.RichEmbed()
    .setColor("#e56b00")
    .addField("User Kicked", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

  const incidentchannel = message.guild.channels.find("name", settings.logs_channel);
  if (!incidentchannel) return;

  message.guild.member(kUser).kick(kReason);
  incidentchannel.send(kickEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "Kick someone in the nuts!",
  usage: "kick [name]"
};
