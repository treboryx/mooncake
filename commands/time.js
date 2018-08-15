exports.run = async function(client, message, args) {
  const timeZone = args[1];
  let neopia = false;
		if (timeZone === 'NEOPIA/STANDARD' || timeZone === 'NEOPIA') {
			timeZone = 'AMERICA/VANCOUVER';
			neopia = true;
		}
		try {
			const time = new Date().toLocaleTimeString('en-US', timeZone);
			return message.channel.send(`The current time in ${neopia ? 'NEOPIA' : timeZone} is ${time}.`);
		} catch (err) {
			return message.reply('Invalid time zone. Refer to <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>.');
}


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
  usage: 'time [timezone]'
};
