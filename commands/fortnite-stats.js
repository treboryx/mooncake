const Fortnite = require('fortnite-api');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

const fortniteAPI = new Fortnite(
  [
    'EMAIL_ACCOUNT',
    'PASSWORD',
    'CLIENT LAUNCHER TOKEN',
    'FORTNITE CLIENT TOKEN'
  ],
  {
    debug: true
  }
);

exports.run = async function(client, message, args) {

  const platforms = ['xbl', 'pc', 'psn'];
  const platform = args[0];
  if (!platforms.includes(platform)) return message.channel.send('Platform must either be `xbl`, `pc`, or `psn`.');
  const username = args.splice(1).join(' ');
  const msg = await message.channel.send(`Fetching the raw stats of ${username}...`);

  fortniteAPI.login().then(() => {
    fortniteAPI
      .getStatsBR(username, platform)
      .then(stats => {
        console.log(stats);

        var embed = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setTitle('LIFETIME STATS')
          .setDescription(`Wins: ${stats.lifetimeStats.wins}\n
        Top 3s: \`${stats.lifetimeStats.top3s}\` -|- Top 5s: \`${stats.lifetimeStats.top5s}\`\n
        Top 6s: \`${stats.lifetimeStats.top6s}\` -|- Top 10s: \`${stats.lifetimeStats.top10s}\`\n
        Top 12s: \`${stats.lifetimeStats.top12s}\` -|- Top 25s: \`${stats.lifetimeStats.top25s}\`\n
        K/D: \`${stats.lifetimeStats['k/d']}\` -|- Win%: \`${stats.lifetimeStats['win%']}\`\n
        Matches: \`${stats.lifetimeStats.matches}\` -|- Kills: \`${stats.lifetimeStats.kills}\`\n
        Kills Per Min.: \`${stats.lifetimeStats.killsPerMin}\` -|- Time Played: \`${stats.lifetimeStats.timePlayed}\`\n
        Kills Per Match: \`${stats.lifetimeStats.killsPerMatch}\` -|- Score: \`${stats.lifetimeStats.score}\n\``);
        message.channel.send(embed);

      })
      .catch(err => {
        throw err;
      });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ftn', 'fstats'],
  permLevel: 'User'
};

exports.help = {
  name: 'fortnite',
  category: 'Misc',
  description: 'Returns Fortnite stats',
  usage: 'fortnite [pc/xb1/psn] [username]'
};
