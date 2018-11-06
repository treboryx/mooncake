const config = require('../util/config.json')
const fs = require("fs");

exports.run = async function(client, message, args) {
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  config.prefix = newPrefix;

  fs.writeFile("./util/config.json", JSON.stringify(config), (err) => console.error);
  return message.channel.send(`Prefix changed to ${config.prefix}`);



};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: 'globalprefix',
  category: "Owner",
  description: "Changes the bot's global prefix.",
  usage: 'globalprefix'
};
