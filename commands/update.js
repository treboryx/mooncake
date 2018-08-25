const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const path = require('path')

exports.run = async (client, message, args) => {

    const settings = message.settings

    message.channel.send('Checking for updates...')

    let repository = await require('../package.json').repository.url.split('+')[1]
    delete require.cache[require.resolve('../package.json')]

    const { stdout, stderr, err } = await exec(`git pull`, { cwd: path.join(__dirname, '../') }).catch(err => ({ err }))
    if (err) {
      console.error(err)
      throw 'Something went wrong!'
    }

    if (stdout.toString().includes('Already up-to-date') || (stdout.toString().includes('Already up to date'))) {
        return message.channel.send('Already up-to-date!');
    } else {
      const { stdout, stderr, err } = await exec(`npm install -g npm`, { cwd: path.join(__dirname, '../') }).catch(err => ({ err }))
      if (err) {
        console.error(err)
        throw 'Something went wrong!'
      }
      await message.channel.send('Successfully updated everything!')
    }

    const packageJSON = await require('../package.json')


    message.channel.send('Updating...')
    client.wait(5000)
    /*
    const out = []
    if (stdout) out.push(stdout)
    if (stderr) out.push(stderr)
    await message.channel.send(out.join('---\n'), { code: true })
    */
    process.exit(1);
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
