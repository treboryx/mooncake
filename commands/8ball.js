const answers = [ 'Maybe.', 'Certainly not.', 'I hope so.', 'Not in your wildest dreams.', 'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.', 'I hope so.', 'Never!', 'Fuhgeddaboudit.', 'Ahaha! Really?!?', 'Pfft.', 'Sorry, bucko.', 'Hell, yes.', 'Hell to the no.', 'The future is bleak.', 'The future is uncertain.', 'I would rather not say.', 'Who cares?', 'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!', 'Pert is gay' ];

exports.run = async function(client, message, args) {
  try {
    if (!message.content.endsWith('?')) return message.reply('That does not look like a question, (hint, end your question with a `?`.)');
    if (!args) return message.reply('You need to actually ask a question...');
    message.channel.startTyping();
    await client.wait(1000);
    const msg = await message.channel.send('`Thinking...`');
    await client.wait(1000);
    setTimeout( async () => {
      await msg.edit(`${answers[Math.floor(Math.random() * answers.length)]}`);
    }, Math.random() * (1 - 5) + 1 * 2000);
  } catch (error) {
    throw error;
  }

  message.channel.stopTyping({force:true});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['8'],
  permLevel: "User"
};

exports.help = {
  name: '8ball',
  category: "Misc",
  description: 'Answers a question',
  usage: '8ball'
};
