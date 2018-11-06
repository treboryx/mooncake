const { letterTrans } = require('custom-translate');
const dictionary = require('../assets/emojify.json');

exports.run = async function(client, message, args) {
  var args = message.content.split(/[ ]+/);
  let textInput = args.join(" ").substring(8);

  return message.channel.send(letterTrans(textInput, dictionary, ' '));


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'emojify',
  category: "Misc",
  description: 'text to emoji letters',
  usage: 'emojify'
};
