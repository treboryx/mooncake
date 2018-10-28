const Discord = require("discord.js");

exports.run = async function(client, message, args) {

  const m = await message.channel.send("Fetching help menu...")

  var embed = new Discord.RichEmbed()
  .setColor('#23D160')
  .setTitle("Commands")
  .setDescription(`'1⃣' Fun\n'2⃣' Moderation\n'3⃣' Utilities`)
  m.edit(embed)
  .then(function (m) {
    m.react('1⃣')
    m.react('2⃣')
    m.react('3⃣')
    m.react("❌")
  })
  await client.wait(5000);
  const collector = m.createReactionCollector((reaction, user) =>
    user.id === m.author.id &&
    reaction.emoji.name === '1⃣' ||
    reaction.emoji.name === '2⃣' ||
    reaction.emoji.name === '3⃣' ||
    reaction.emoji.name === "❌"
).once("collect", reaction => {
    const chosen = reaction.emoji.name;
    if(chosen === '1⃣'){
      var embed = new Discord.RichEmbed()
      .setColor('#23D160')
      .setTitle("Commands")
      .setDescription(`Fun`)
      m.edit(embed)
    }else if(chosen === '2⃣'){
      var embed = new Discord.RichEmbed()
      .setColor('#23D160')
      .setTitle("Commands")
      .setDescription(`Moderation`)
      m.edit(embed)
    }else if(chosen === '3⃣'){
      var embed = new Discord.RichEmbed()
      .setColor('#23D160')
      .setTitle("Commands")
      .setDescription(`Utilities`)
      m.edit(embed)
    }else{
        m.delete();
    }
    collector.stop();
});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: 'help2',
  category: "System",
  description: "reaction menu",
  usage: 'help2'
};
