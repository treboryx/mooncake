exports.run = async function(client, message, args) {
  var today = new Date();
  console.log(today.toString());
  const Day = today.toString().split(" ")[0];
  const Month = today.toString().split(" ")[1];
  const Year = today.toString().split(" ")[3];
  message.channel.send(`\`${Day}\` \`${Month}\` \`${Year}\`\n\`Time:\` \`${today.toString().split(" ")[4]}\``);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "time",
  category: "Misc",
  description: "Tells the time.",
  usage: "time"
};
