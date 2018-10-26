exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const m = await message.channel.send("Ping?");
  m.edit(`<:465243292297068581:505062420054540309> 🏓 Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscellaneous",
  description: "Shows the bot's latency.",
  usage: "ping"
};
