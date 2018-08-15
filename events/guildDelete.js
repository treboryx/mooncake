module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD LEAVE] ${guild.name} (id: ${guild.id}). Owned by: ${guild.owner} ${guild.owner.user.tag} UID: ${guild.ownerID}`);


  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
};
