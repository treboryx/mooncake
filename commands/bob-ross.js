const { registerFont, createCanvas, loadImage } = require('canvas');
const { stripIndents } = require('common-tags');
const request = require('node-superfetch');
const path = require('path');
const { shortenText } = require('../util/Canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });


exports.run = async function (client, message) {

	// const settings = client.getGuildSettings(message.guild);

	let target = message.mentions.members.first();
	if(!target) return message.reply(`Usage: ${message.settings.prefix}bobross [user]`);
	const avatarURL = target.user.displayAvatarURL;

	try {
			const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'bob-ross.png'));
			const { body } = await request.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.rotate(3 * (Math.PI / 180));
			ctx.drawImage(avatar, 69, 102, 256, 256);
			ctx.rotate(-3 * (Math.PI / 180));
			ctx.drawImage(base, 0, 0);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'bob-ross.png' }] });
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
}

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bob-ross'],
  permLevel: "User"
};

exports.help = {
  name: 'bobross',
	category: "Miscellaneous",
  description: 'Puts user\'s avatar on Bob Ross\'s canvas',
  usage: 'bobross [user]'
};
