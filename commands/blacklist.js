exports.run = async (client, message, args) => {
  console.log('test');
  const blacklist = client.blacklist;

  const action = args[0];
  let user = args[1];
  let answer;
  switch (action) {
    case 'add':
      user = client.users.get(args[1]) || message.mentions.users.first();
      if (user === message.author) return message.channel.send('We\'ve talked about this, you can\'t blacklist yourself.');
      if (!user) return message.channel.send('User not found.');
      blacklist.set(user.id, {
        user: user.id,
        tag: user.tag
      });
      message.channel.send(`${user.tag} has been blacklisted.`);
      break;
    case 'remove':
    case 'del':
      user = client.users.get(args[1]) || message.mentions.users.first();
      if (!user) return message.channel.send('User not found.');
      if (blacklist.has(user.id)) {
        blacklist.delete(user.id);
        message.channel.send(`${user.tag} has been removed from the blacklist.`);
      } else {
        message.channel.send('User is not in the blacklist.');
      }
      break;
    case 'view':
      // eslint-disable-next-line no-case-declarations
      const list = blacklist.map(entry => `${entry.tag} (${entry.user})`);
      if (!list.length) {
        answer = 'The blacklist is empty.'; 
      } else {
        answer = `\`\`\`${list.join('\n')}\`\`\``;
      }
      message.channel.send(answer);
      break;
    default:
      return message.channel.send('blacklist <view/add/remove> <user>');
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Owner'
};

exports.help = {
  name: 'blacklist',
  category: 'Owner',
  description: 'Blacklists a user from using the bot.',
  usage: 'blacklist <add/view/remove> <user>'
};
