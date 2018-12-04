const { registerFont, createCanvas, loadImage } = require("canvas");
const { stripIndents } = require("common-tags");
const path = require("path");
const { shortenText } = require("../util/Canvas");
registerFont(path.join(__dirname, "..", "assets", "fonts", "Minecraftia.ttf"), { family: "Minecraftia" });

exports.run = async function(client, msg,  args) {

  const text = args.join(" ").substring(0);
  const base = await loadImage(path.join(__dirname, "..", "assets", "images", "achievement.png"));
  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(base, 0, 0);
  ctx.font = "17px Minecraftia";
  ctx.fillStyle = "#ffff00";
  ctx.fillText("Achievement Get!", 60, 40);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(shortenText(ctx, text, 230), 60, 60);
  return msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: "achievement.png" }] });

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["achieve"],
  permLevel: "User"
};

exports.help = {
  name: "achievement",
  category: "Misc",
  description: "Minecraft achievement",
  usage: "achievement [text]"
};
