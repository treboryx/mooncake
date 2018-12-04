const func = require("../index.js");

module.exports = async client => {

  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");
  // if (!client.blacklist.get("list")) client.blacklist.set("list", []);
  setInterval(func.statistics, 30000);
  client.user.setActivity(`${client.users.size} users | ${client.config.defaultSettings.prefix}help`, {type: "WATCHING"});
};
