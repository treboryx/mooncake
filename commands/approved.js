const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const path = require("path");

exports.run = async function(client, message) {

  const target = message.mentions.members.first();
  const avatarURL = target.user.displayAvatarURL;

  try {
    const base = await loadImage(path.join(__dirname, "..", "assets", "images", "approved.png"));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(avatar.width, avatar.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(avatar, 0, 0);
    ctx.drawImage(base, 0, 0, avatar.width, avatar.height);
    return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "approved.png" }] });
  } catch (err) {
    return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["approve"],
  permLevel: "User"
};

exports.help = {
  name: "approved",
  category: "Misc",
  description: "Approved stamp over user's avatar",
  usage: "approved [user]"
};
