const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const path = require("path");
const { drawImageWithTint } = require("../util/Canvas");

exports.run = async function(client, message) {

  const target = message.mentions.members.first();
  const avatarURL = target.user.displayAvatarURL;

  try {
    const base = await loadImage(path.join(__dirname, "..", "assets", "images", "triggered.png"));
    const { body } = await request.get(avatarURL);
    const avatar = await loadImage(body);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, base.width, base.height);
    drawImageWithTint(ctx, avatar, "red", 0, 0, 320, 320);
    ctx.drawImage(base, 0, 0);
    return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "triggered.png" }] });
  } catch (err) {
    return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["trigger"],
  permLevel: "User"
};

exports.help = {
  name: "triggered",
  category: "Misc",
  description: "Triggered meme over user's avatar",
  usage: "triggered [user]"
};
