const request = require('node-superfetch');
const { stripIndents } = require('common-tags');


exports.run = async function(client, message) {
  var args = message.content.split(/[ ]+/);
  try {
    const subReddit = args[1];
    const { body } = await request
      .get(`https://www.reddit.com/r/${subReddit}/new.json`)
      .query({ sort: 'new' });
    const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
    if (!allowed.length) return message.channel.send('Could not find any results.');
    const post = allowed[Math.floor(Math.random() * allowed.length)].data;
    return message.channel.send(stripIndents`
				**${post.title}**
				<https://www.reddit.com${post.permalink}>
				⬆ ${post.ups} ⬇ ${post.downs}
			`);
  } catch (err) {
    if (err.status === 403) return message.channel.send('This subreddit is private.');
    if (err.status === 404) return message.channel.send('Could not find any results.');
    return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
};

exports.help = {
  name: 'reddit',
  category: 'Misc',
  description: 'Posts link of a random post from a subreddit',
  usage: 'reddit [subreddit]'
};
