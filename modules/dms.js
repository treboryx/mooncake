module.exports = class {

  static run(client, message) {
    this.DM(client, message);
  }
  static DM(client, message) {
    if (message.channel.type === 'dm') {
      client.channels.get('323596194267922433').send(`${message.author.tag} (${message.author.id}) sent me a message: \`${message.content}\``);
    }
  }
};
