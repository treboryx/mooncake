exports.run = async function(client, message, args) {
  var today = new Date()
  console.log(today.toString());
  let Day = today.toString().split(" ")[0]
  let Month = today.toString().split(" ")[1]
  let Year = today.toString().split(" ")[3]
  message.channel.send(`\`${Day}\` \`${Month}\` \`${Year}\`\n\`Time:\` \`${today.toString().split(" ")[4]}\``)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'time',
  category: "Miscellaneous",
  description: 'Tells the time.',
  usage: 'time'
};
