const Discord = require('discord.js');
const perpage = 10;

exports.run = (client, message, [type, page], level) => {

  if (type) type = type.toLowerCase();
  if (page) page = parseInt(page);

  const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(6192321)
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL);

  let currentCategory = '';
  const sorted = client.commands.sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

  if (!type) {
    const description = `Command category list\n\nUse \`${message.settings.prefix}help <category>\` to find commands for a specific category`;
    const output = sorted.filter(c => !(level < 10 && c.help.category === 'Owner') || (c.help.category === 'NSFW' && !message.channel.nsfw)).map(c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat && !type) {
        currentCategory = cat;
        return `\n\`${message.settings.prefix}help ${cat.toLowerCase()}\` | Shows ${cat} commands`;
      }
    }).join('');
    embed.setDescription(description)
      .addField('Categories', output);

  } else {
    if (client.commands.has(type)) {
      const cm = client.commands.get(type) || client.commands.get(client.aliases.get(type));
      if (level < client.levelCache[cm.permLevel]) return;
      embed.setTitle(cm.help.name.toProperCase())
        .addField('Command description', cm.help.description)
        .addField('Command usage', `\`${cm.help.usage}\``)
        .addField('Command aliases', cm.conf.aliases.length === 0 ? 'None' : cm.conf.aliases.join(', ') );
      // .addField("Extended description", cm.help.extended);

    } else {
      let n = 0;
      sorted.forEach(c => {
        c.help.category.toLowerCase() === type ? n++ : n;
      });

      let output = '';
      let num = 0;
      const pg = page && page <= Math.ceil(n / perpage) ? page : 1;
      for (const c of sorted.values()) {
        if (c.help.category.toLowerCase() === type) {
          if (num < perpage * pg && num > perpage * pg - (perpage + 1)) {
            if (level < client.levelCache[c.permLevel]) continue;
            if (c.help.category === 'Owner' && !message.channel.nsfw && level < 10) continue;
            output += `\n\`${message.settings.prefix + c.help.name}\` | ${c.help.description.length > 50 ? c.help.description.slice(0,50) +'...': c.help.description}`;
          }
          num++;
        }
      }

      if (!num) return;
      embed.setTitle('Command category help')
        .setDescription(`A list of commands in the ${type} category.\n(Total of ${num} commands in this category)\n\nTo get help on a specific command do \`${message.settings.prefix}ohelp <command>\`\n\n${num > 10 && pg === 1 ? `To view more commands do\` ${message.settings.prefix}help <category> 2\`` : '' }`)
        .addField('Commands', output);

    }
  }
  return message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h'],
  permLevel: 'User'
};

exports.help = {
  name: 'help',
  category: 'System',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};
