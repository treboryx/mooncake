// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (id: ${guild.id}) added the bot. This guild has ${guild.memberCount} members! Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  // if (!client.blacklist.get("list")) client.blacklist.set("list", []);
  // client.user.setActivity(`Serving ${client.guilds.size} servers`);
  // guild.client.settings.set(guild.id, data.defaultSettings);
};
