const Discord = require("discord.js");
const colors = require('../assets/colorsrandom.json')

exports.run = async function(client, message, args) {
  if(!message.member.roles.some(r=>["Manager", "Lead Admin", "Admin", "Moderator", "Member"].includes(r.name)) )
         return message.reply("Sorry, you don't have permissions to use this!");  {

       let memberInfo = message.mentions.members.first();
       const color = colors[Math.floor(Math.random() * colors.length)];


      if(!memberInfo){
                  const embed = new Discord.RichEmbed()
                 .setAuthor(`❯ Name: ${message.author.username}`)
                 .setThumbnail(message.author.avatarURL)
                 .setDescription("Member's information")
                 .setColor(color)
                 .addField("❯ Full Username:", `${message.author.username}#${message.author.discriminator}`)
                 .addField("❯ ID:", message.author.id)
                 .addField("❯ Created At:", message.author.createdAt)

                 message.channel.send({embed});

           }else{

             const embed = new Discord.RichEmbed()
                 .setAuthor(`❯ Name: ${memberInfo.displayName}`)
                 .setThumbnail(memberInfo.user.avatarURL)
                 .setDescription("Member's information")
                 .setColor(color)
                 .addField("❯ Full Username:", `${memberInfo.user.username}#${memberInfo.user.discriminator}`)
                 .addField("❯ ID:", memberInfo.id)
                 .addField("❯ Created At:", memberInfo.user.createdAt)

                 message.channel.send({embed});
           }
 }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'whois',
  category: "Miscellaneous",
  description: 'shows info about a member',
  usage: 'whois [name]'
};
