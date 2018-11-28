const { inspect } = require('util');

exports.run = async (client, message, [action, key, ...value], level) => {
  const settings = message.settings;
  const overrides = client.settings.get(message.guild.id);

  if (action === 'edit') {
    if (!key) return message.reply('Please specify a key to edit');
    if (!settings[key]) return message.reply('This key does not exist in the settings');
    if (value.length < 1) return message.reply('Please specify a new value');
    if (value.join(' ') === settings[key]) return message.reply('This setting already has that value!');

    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    client.settings.setProp(message.guild.id, key, value.join(' '));

    message.reply(`${key} successfully edited to ` + '`' + value.join(' ') + '`');
  } else

  if (action === 'reset') {
    if (!key) return message.reply('Please specify a key to reset.');
    if (!settings[key]) return message.reply('This key does not exist in the settings');
    if (!overrides[key]) return message.reply('This key does not have an override and is already using defaults.');

    const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

    if (['y', 'yes'].includes(response.toLowerCase())) {
      delete overrides[key];
      client.settings.set(message.guild.id, overrides);
      message.reply(`${key} was successfully reset.`);
    } else

    if (['n','no','cancel'].includes(response)) {
      message.reply('Action cancelled.');
    }
  } else

  if (action === 'get') {
    if (!key) return message.reply('Please specify a key to view');
    if (!settings[key]) return message.reply('This key does not exist in the settings');
    const isDefault = !overrides[key] ? '\nThis is the default global default value.' : '';
    message.reply(`The value of ${key} is currently ${settings[key]}${isDefault}`);
  } else {
    message.channel.send(inspect(settings), {code: 'json'});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['setting', 'settings', 'conf'],
  permLevel: 'Administrator'
};

exports.help = {
  name: 'set',
  category: 'System',
  description: 'View or change settings for your server.',
  usage: 'set <view/get/edit> <key> <value>'
};
