const { get } = require("snekfetch");

exports.run = async function(client, message, args) {

  const text = args.join(" ").substring(0);
  const msg = await message.channel.send("Trump is tweeting...");
  const { body } = await get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`);
  await msg.edit({
    embed: {
      "title": "Click here if the image failed to load.",
      "url": body.message,
      "color": 6192321,
      "image": {
        "url": body.message
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
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "trumptweet",
  category: "Misc",
  description: "Trump is tweeting something...",
  usage: "trumptweet"
};
