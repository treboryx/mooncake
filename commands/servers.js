exports.run = async function(client, message, args) {
   message.channel.send(`= Servers [${this.client.guilds.size}] = \n${this.client.guilds.map(g => `${g.id}  -  ${g.name}  -  [Members: ${g.memberCount}]`).join('\n')}`, {code:'asciidoc', split: { char: '\u200b' }});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['guilds'],
  permLevel: "Bot Owner"
};

exports.help = {
  name: 'servers',
  category: "servers",
  description: 'List of all servers',
  usage: 'servers'
};
