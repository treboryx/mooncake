exports.run = async (client, message, params) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
    return message.reply("You have to be in a voice channel first!");
  }

  if(client.playlists.has(message.guild.id)) {
    const queue = client.playlists.get(message.guild.id);
    queue.queue = [];
    queue.dispatcher.end();
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "stop",
  category: "Music",
  description: "Stops the queue",
  usage: "stop"
}
