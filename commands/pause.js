exports.run = async (client, message, params) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply("You have to be in a voice channel first!");
  }
  if (client.playlists.get(message.guild.id).dispatcher.paused) return message.reply("The player is already paused... :thiinking");
  message.channel.send("Pausing!");
  client.playlists.get(message.guild.id).dispatcher.pause();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "pause",
  category: "Music",
  description: "Pauses the queue",
  usage: "pause"
};
