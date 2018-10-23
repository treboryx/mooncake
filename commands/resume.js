exports.run = async (client, message, params) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply("You have to be in a voice channel first!");
  }
  if (!client.playlists.get(message.guild.id).dispatcher.paused) return message.reply("But the player wasn't paused...");
  message.channel.send("Resuming!");
  client.playlists.get(message.guild.id).dispatcher.resume();
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "resume",
  category: "Music",
  description: "Resumes the paused queue",
  usage: "resume"
}
