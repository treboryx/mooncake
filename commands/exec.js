const exec = require("child_process").exec;

exports.run = async (client, message, args, level) => {
  exec(`${args.join(" ")}`, (error, stdout) => {
    const response = (error || stdout);
    message.channel.send(`Ran: ${message.content}\n\`\`\`${response}\`\`\``, {split: true}).catch(console.error);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["shell"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "exec",
  category: "Owner",
  description: "Execute commands.",
  usage: "exec [command]"
};
