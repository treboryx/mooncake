const { registerFont, createCanvas, loadImage } = require('canvas');
const { stripIndents } = require('common-tags');
const request = require('node-superfetch');
const path = require('path');
const { shortenText } = require('../util/Canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });


exports.run = async function (client, message) {

	const settings = client.getGuildSettings(message.guild);

	let target = message.mentions.members.first();
	if(!target) return message.reply(`Usage: ${message.settings.prefix}steamcard [user]`);
	const avatarURL = target.user.displayAvatarURL;

	try {
				const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'steam-card.png'));
				const { body } = await request.get(avatarURL);
				const avatar = await loadImage(body);
				const canvas = createCanvas(base.width, base.height);
				const ctx = canvas.getContext('2d');
				ctx.fillStyle = '#feb2c1';
				ctx.fillRect(0, 0, base.width, base.height);
				ctx.drawImage(avatar, 12, 19, 205, 205);
				ctx.drawImage(base, 0, 0);
				ctx.font = '14px Noto';
				ctx.fillStyle = 'black';
				ctx.fillText(target.user.username, 16, 25);
				ctx.fillStyle = 'white';
				ctx.fillText(target.user.username, 15, 24);
				return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'steam-card.png' }] });
			} catch (err) {
				return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
	}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['steam-card'],
  permLevel: "User"
};

exports.help = {
  name: 'steamcard',
	category: "Miscellaneous",
  description: 'User is now playing, like on steam.',
  usage: 'steamcard [game] [user]'
};
