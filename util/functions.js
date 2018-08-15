const Discord = require("discord.js");
const client = new Discord.Client();

const autoResponder = {
  "spongebob": {
            file: ""
          },
  "oof": {
            file: "https://cdn.discordapp.com/attachments/473899818847305738/473899836333359134/oof.png"
          },
  "devin": "daddy?",
  "spock": {
    file: "https://cdn.discordapp.com/attachments/275732552797519873/475936918027239425/Z.png"
  },
  "mock": {
    file: "https://cdn.discordapp.com/attachments/458751527407058954/473641693883924481/mock.png"
  }
};

exports.autoResponder = autoResponder;


exports.checkBots = function (guild) {
    let botCount = 0;
    guild.members.forEach(member => {
      if(member.user.bot) botCount++;
    });
    return botCount;
  }


exports.checkMembers = function (guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++;
    });
    return memberCount;
  }



exports.mock = function(string) {
    var chars = string.toUpperCase().split('');
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toLowerCase();
    }
    return chars.join('');
};





exports.statistics = function () {
	const memoryUsage = process.memoryUsage()
  let totalSeconds = (client.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
	console.log('ram.rss', (memoryUsage.rss / 1048576).toFixed())
	console.log('ram.heapUsed', (memoryUsage.heapUsed / 1048576).toFixed())
	console.log('total.guilds', client.guilds.size)
	console.log('total.users', client.users.size)
	console.log('current.vcs', client.voiceConnections.size)
	console.log(`current.uptime ${hours}h, ${minutes}m & ${seconds.toFixed()}s`)
}