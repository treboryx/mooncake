const trump = require('react-trump')
const { trumpers } = require('../assets/arrays.json')
const exclamations = 1
const incquestion = false
const mainFuncs = require('../util/main.js')


exports.run = async function (client, msg, args) {
	if (!args[0]) {
		return client.reply('You gotta give me something to ask Trump :eyes:', msg)
	}

	const question = args.join(' ')
	const answer = await trump.answer({
		question,
		exclamations,
		incquestion
	})


    msg.channel.send({
		embed: {
			color: mainFuncs.colors.pink,
			thumbnail: { url: mainFuncs.randomInArray(trumpers)},
			description: `\n${msg.author.username}: ${question}\n\nTrump: ${answer}`
		}
	})

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'asktrump',
	category: "Miscellaneous",
  description: 'ask trump',
  usage: 'asktrump'
};
