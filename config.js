const prefix = require('./util/config.json')

const config = {
  "ownerID": "254279600841031680",

  "admins": [],

  "support": [],

  "token": "NDczMTAzMjc4MTAwNzA5Mzc2.DrXuOQ._NpRexDisBLn0jNE4Nc4XXw-NEA",

  "youtubeAPIKey": "AIzaSyD8LBy3ZmpeQ185HSJ916u2xazZQMRy0qA",

  "defaultSettings" : {
    "prefix": `${prefix.prefix}`,
    "logs_channel": "logs",
    "log_everything": "false",
    "channelCreateDeleteUpdate": "true",
    "guildUpdateBanAddRemove": "true",
    "guildMemberAddRemoveUpdate": "true",
    "messageDeleteUpdate": "true",
    "roleCreateDeleteUpdate": "true",
    "voiceStateUpdate": "false",
    "mod_role": "Moderator",
    "admin_role": "Administrator",
    "system_notice": "true", // This gives a notice when a user tries to run a command that they do not have permission to use.
    "welcome_channel": "welcome",
    "welcome_message": "Welcome {{user}}!",
    "welcome_enabled": "false"
  },


  permLevels: [

    { level: 0,
      name: "User",
      check: () => true
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const mod_role = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.mod_role.toLowerCase());
          if (mod_role && message.member.roles.has(mod_role.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",
      check: (message) => {
        try {
          const admin_role = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.admin_role.toLowerCase());
          return (admin_role && message.member.roles.has(admin_role.id));
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner",
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },

    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner",
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
