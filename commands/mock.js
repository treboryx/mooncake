const func = require('../util/functions.js')

exports.run = async function(client, message, args) {
        message.channel.fetchMessages({limit: 2}).then(messages => {
          const fetched = messages.last();
          if(message.author.bot) return;
          message.channel.send(func.mock(fetched.content), {
            file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
          });
        })


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'mock',
  category: "Misc",
  description: 'Spongebob mock meme',
  usage: 'mock'
};
