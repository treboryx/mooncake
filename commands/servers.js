exports.run = async function(client, message, args) {
  message.channel.send(`= Servers [${client.guilds.size}] = \n${client.guilds.map(g => `${g.id}  -  ${g.name}  -  [Members: ${g.memberCount}]`).join('\n')}`, {code:'asciidoc', split: { char: '\u200b' }});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['guilds'],
  permLevel: 'Bot Owner'
};

exports.help = {
  name: 'servers',
  category: 'Owner',
  description: 'List of all servers',
  usage: 'servers'
};
