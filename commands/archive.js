exports.run = async function(client, message, args) {
  const amount = args[0];
if (!amount) return message.error(message, 'You must supply an amount of messages to use this command.');
try {
  const msgs = await message.channel.fetchMessages({ limit: `${amount}` + 1})
    .then(messages => messages.map(m => `${m.createdAt} (${m.guild.id} / #${m.channel.id} / ${m.author.id}) ${m.author.tag} : ${m.cleanContent}`).join('\n'));
  const hasteURL = await require('snekfetch')
    .post('https://hastebin.com/documents')
    .send(msgs).catch(e => {
      throw new Error(`Error posting data: ${e}`);
    });
  const archive = `http://hastebin.com/${hasteURL.body.key}.txt`;
  message.channel.send(`Here's the archive. ${archive}`);
} catch (error) {
  throw error;
}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: 'archive',
  category: "Moderation",
  description: 'Archives messages and returns a hastebin.',
  usage: 'archive'
};
