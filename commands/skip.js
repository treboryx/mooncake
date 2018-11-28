exports.run = (client, message, params) => {
  const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  if (!voiceChannel || (!message.member.voiceChannel)) {
    return message.reply('You have to be in a voice channel first!');
  }

  const voiceUsers = Math.floor(message.member.voiceChannel.members.filter(m => m.user.id !== client.user.id).size * 2 / 3);

  if (voiceUsers < 2 || message.author.permLevel > 2) {
    return message.channel.send('Skipping song...').then(()=> {
      client.playlists.get(message.guild.id).dispatcher.end('skip');
    });
  }

  message.channel.send(`You have 10 seconds to vote for the \`skip\`, you need at least ${voiceUsers} votes to be successful`);

  const filter = m => m.content.startsWith('skip');

  message.channel.awaitMessages(filter, {
    'errors': ['time'],
    'max': voiceUsers,
    time: 10000
  }).then(collected => {
    if (collected.size > voiceUsers) return message.channel.send('Skipping current song...');
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'skip',
  category: 'Music',
  description: 'Skips the current song in the queue',
  usage: 'skip'
};
