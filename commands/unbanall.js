
exports.run = async function(client, message, args) {
  let bans = await message.guild.fetchBans();
  bans = bans.array(); 
  bans.forEach(function(ban) {
    message.guild.unban(ban.id);
  });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'unbanall',
  category: 'Moderation',
  description: 'unbanall',
  usage: 'unbanall'
};
