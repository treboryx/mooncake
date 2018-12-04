const { get } = require("snekfetch");

exports.run = async function(client, message, args) {
  if (!message.channel.nsfw) return message.channel.send("🔞 Cannot display NSFW content in a SFW channel.");
  const msg = await message.channel.send(`<a:typing:492332824091688960> **${message.member.displayName}** is looking for boobies...`);
  const { body } = await get("http://api.oboobs.ru/boobs/0/1/random");
  await msg.edit({
    embed: {
      "title": "Click here if the image failed to load.",
      "url": `http://media.oboobs.ru/${body[0].preview}`,
      "color": 6192321,
      "image": {
        "url": `http://media.oboobs.ru/${body[0].preview}`
      },
      "footer": {
        "icon_url": message.author.displayAvatarURL,
        "text": `Requested by ${message.author.tag}`
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["breasts", "jugs", "cans", "knockers", "bongos", "bubbies", "bumpers", "bewbz", "tits", "tatas", "chesticles", "gazongas", "titties", "headlamps", "honkburgers", "jubblies", "mankillers", "melons"],
  permLevel: "User"
};

exports.help = {
  name: "boobs",
  category: "NSFW",
  description: "Boobs. Just boobs.",
  usage: "boobs"
};
