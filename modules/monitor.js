const timeout = new Map();
module.exports.run = (client, message, level) => {
  const settings = client.getGuildSettings(message.guild);
  if (settings.antiInvite === 'false') return;
  if (level > 0) return;
  if (/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(message.content)) {
    message.delete().then(() => {
      let count = 1;
      const spammer = `${message.guild.id}-${message.author.id}`;
      const list = client.invspam.get(spammer) || client.invspam.set(spammer, { count: 0 }).get(spammer);
      if (list) count = list.count + 1;
      if (count >= parseInt(client.settings.get(message.guild.id).inviteLimit)) {
        message.member.ban({ days: 2, reason: 'Automatic ban, invite spam threshold exceeded.' }).then((g) => {
          message.channel.send(`${g.user.username} was banned for spamming invite links!`);
          client.invspam.delete(spammer);
        });
      }
      client.invspam.set(spammer, { count });
    });
    message.channel.send(`${message.author} |\`⛔\`| The message you tried to send contained the link to a server. Message deleted.`);
  }
};
