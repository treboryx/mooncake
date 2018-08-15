const Discord = require("discord.js");
const errors = require("../util/errors.js");

exports.run = async function(client, message, args) {

      const settings = client.getGuildSettings(message.guild);

      if(!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
      if(args[0] == "help"){
        message.reply(`Usage: ${message.settings.prefix}ban <user> <reason>`);
        return;
      }
      let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!bUser) return errors.cantfindUser(message.channel);
      if(bUser.id === client.user.id) return errors.botuser(message);
      let bReason = args.join(" ").substring(19);
      if(!bReason) return errors.noReason(message.channel);
      if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Ban~")
      .setColor("#bc0000")
      .addField("Banned User", `${bUser} with ID ${bUser.id}`)
      .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
      .addField("Banned In", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", bReason);

      let incidentchannel = message.guild.channels.find(`name`, settings.logs_channel);
      if(!incidentchannel) return;

      message.guild.member(bUser).ban(bReason);
      incidentchannel.send(banEmbed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: 'ban',
  category: "Moderation",
  description: 'BAN HAMMER',
  usage: 'ban [name] [reason/optional]'
};
