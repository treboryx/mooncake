const { promisify } = require('util')
// const exec = promisify(require('child_process').exec)
const path = require('path')
const exec = require('child_process').execSync

exports.run = async (client, message, args, level) => {

  await message.channel.send('**Checking for updates...**')
  try {
        var gitPull = exec('git pull --all').toString()
        await message.channel.send({
          content: gitPull,
          code: '',
          split: true
        })
        if (/Already up-to-date.|Already up to date./.test(gitPull)) {
          await message.channel.send('**There was nothing to update!**')
        } else {
          var npmUpdate = exec('npm install').toString()
          await message.channel.send({
            content: npmUpdate,
            code: '',
            split: true
          })
          await message.channel.send(`**Successfully updated everything! Awaiting next restart.**`)
        }
      } catch (error) {
        await message.channel.send({
          content: error.stack,
          code: '',
          split: true
        })
  message.channel.send('**An error has occurred.**')
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "update",
  category: "System",
  description: "Pulls the latest update and restarts.",
  usage: "update"
};
