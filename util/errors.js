const Discord = require('discord.js');
const fs = require('fs');
const color = require('../assets/colors.json');

module.exports.noPerms = (message, perm) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle('Insufficient Permission')
    .setColor(color.red)
    .addField('Permission needed', perm);

  message.channel.send(embed).then(m => m.delete(5000));
};

module.exports.equalPerms = (message, user, perms) => {

  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(color.red)
    .setTitle('Error')
    .addField(`${user} has perms`, perms);

  message.channel.send(embed).then(m => m.delete(5000));

};

module.exports.botuser = (message) => {
  const embed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription('You cannot ban a bot.')
    .setColor(color.red);

  message.channel.send(embed).then(m => m.delete(5000));
};

module.exports.cantfindUser = (channel) => {
  const embed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription('Could not find that user.')
    .setColor(color.red);

  channel.send(embed).then(m => m.delete(5000));
};

module.exports.noReason = (channel) => {
  const embed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription('Please supply a reason.')
    .setColor(color.red);

  channel.send(embed).then(m => m.delete(5000));
};
