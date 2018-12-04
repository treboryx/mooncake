const Discord = require('discord.js');
const ms = require('ms');

exports.run = async function(client, message, args) {

  const settings = client.getGuildSettings(message.guild);

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Insufficient permissions.');
  if (args[0] == 'help' || args.length == 0) {
    message.reply(`Usage: ${message.settings.prefix}mute <user> <1s/m/h/d>`);
    return;
  }
  const tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply('You didn\'t mentioned a user');
  if (tomute.hasPermission('MANAGE_MESSAGES')) return message.reply('Can\'t mute user with equal permissions.');
  const reason = args.slice(2).join(' ');
  // if (!reason) return message.reply(`Usage: ${message.settings.prefix}mute <user> <1s/m/h/d>`);

  let muterole = message.guild.roles.find(role => role.name === 'muted');

  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: 'muted',
        color: '#000000',
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  const mutetime = args[1];
  if (!mutetime) return message.reply(`Usage: ${message.settings.prefix}mute <user> <1s/m/h/d>`);

  message.delete().catch(O_o => {});



  // try {
  //     await tomute.send(`You have been muted for ${mutetime}.`)
  // } catch (e) {
  //     message.channel.send(`${tomute} has been muted for ${mutetime}.`)
  // }

  const incidentschannel = message.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!incidentschannel) return;

  if (!reason) {
    const muteembed = new Discord.RichEmbed()
      .setColor('#EEB231')
      .addField('User muted:', tomute)
      .addField('Muted in:', message.channel)
      .addField('Mute time:', mutetime)
      .addField('Reason', 'No reason provided')
      .setFooter(`By ${message.author.tag}`, message.author.avatarURL)
      .setTimestamp();
    incidentschannel.send(muteembed);

  } else {
    const muteembed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .addField('User muted:', tomute)
      .addField('Muted in:', message.channel)
      .addField('Mute time:', mutetime)
      .addField('Reason', reason)
      .setFooter(`By ${message.author.tag}`, message.author.avatarURL)
      .setTimestamp();
    incidentschannel.send(muteembed);
  }

  tomute.send(`<@${tomute.id}> you have been muted from **${message.guild.name}** for ${mutetime}`);
  await (tomute.addRole(muterole.id));

  setTimeout(function() {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted.`);
  }, ms(mutetime));
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Moderator'
};

exports.help = {
  name: 'mute',
  category: 'Moderation',
  description: 'Mute someone for a set time',
  usage: 'mute [name] [time] [reason/optional]'
};
