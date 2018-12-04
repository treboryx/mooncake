const Discord = require("discord.js");
const request = require("node-superfetch");

exports.run = async function(client, message, args, { month, day }) {
  const date = month && day ? `/${month}/${day}` : "";
  try {
    const { text } = await request.get(`http://history.muffinlabs.com/date${date}`);
    const body = JSON.parse(text);
    const events = body.data.Events;
    const event = events[Math.floor(Math.random() * events.length)];
    const embed = new Discord.RichEmbed()
      .setColor(0x9797FF)
      .setURL(body.url)
      .setTitle(`On this day (${body.date})...`)
      .setTimestamp()
      .setDescription(`${event.year}: ${event.text}`)
      .addField("❯ See More",
        event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, "%29")})`).join(", "));
    return message.channel.send({embed});
  } catch (err) {
    if (err.status === 404 || err.status === 500) return message.say("Invalid date.");
    return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "today",
  category: "Misc",
  description: "Returns with an event that happened today in history",
  usage: "today"
};
