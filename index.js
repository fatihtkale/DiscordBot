// Import the discord.js module
const Discord = require("discord.js");
const Fortnite = require('fortnite');
const client = new Fortnite('fc5c9c9c-0888-4f97-a5ff-1478a29b3c92');

// Create an instance of a Discord client
const bot = new Discord.Client();
const config = {
  prefix: "!",
  guildId: "371603877289656320",
  testGuildId: "411959617246068759",
  testGuildChannel: "412242776562860042"
};

const fs = require("fs"); // requiering package from node no need to download anything
const userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"));
const commandsList = fs.readFileSync("Storage/commands.txt", "utf8");

var guild; // The Fortnite Team Finder Server
var channels = {}; // Channels of the server
var testChannel;

class Command {
  constructor(name, func, args = false) {
    this.hasArgs = false;
    this.main = func; // code that runs when command is called
    this.name = name; // name of the command, prefix + name calls the command
    this.hasArgs = args;
  }
}

// general handler
class ChatHandler {
  constructor() {
    this.rankwin = new Command("rankwin", (message) => {
      function getStat(statlist, stat) {
        return statlist.find(function(e) {
          return e.stat === stat;
        });
      }

      function getRole(rolename) {
        return message.guild.roles.find("name", rolename);
      }

      if (userData[message.author.id] === undefined) {
        message.channel.send("You're not verified - please verify your account before using this command.");
        return;
      }

      client.getInfo(userData[message.author.id], 'pc').then(
        data => {
          //var output = JSON.stringify(data);
          const wins = getStat(data.lifetimeStats, "wins").value;
          
          if (wins < 10) {
            message.channel.send("You need to have at least 10 wins to get a rank.");
            return;
          }
          message.member.removeRoles([getRole("Bronze"), getRole("Silver"), getRole("Gold"), getRole("Platinum"), getRole("Diamond"), getRole("Ruby")]);
          if (wins > 1000) {
            message.member.addRole(getRole("Ruby"));
            message.channel.send("You are now Ruby.");
          }
          else if (wins > 500) {
            message.member.addRole(getRole("Diamond"));
            message.channel.send("You are now Diamond.");
          }
          else if (wins > 250) {
            message.member.addRole(getRole("Platinum"));
            message.channel.send("You are now Platinum.");
          }
          else if (wins > 100) {
            message.member.addRole(getRole("Gold"));
            message.channel.send("You are now Gold.");
          }
          else if (wins > 50) {
            message.member.addRole(getRole("Silver"));
            message.channel.send("You are now Silver.");
          }
          else if (wins > 10) {
            message.member.addRole(getRole("Bronze"));
            message.channel.send("You are now Bronze.");
          }
        }).catch
        (e => {
          message.channel.send("Error: " + e);
        });
    });

    this.link = new Command("link", (message) => {
      let epic = parseArgsClean(message, this.link);
      userData[author.id] = epic;
      fs.writeFileSync("Storage/userData.json", JSON.stringify(userData), {encoding: "utf8"});
      message.channel.send("You're now linked.");
    });

    // !changename -- Changes the user's nickname
    this.changename = new Command("changename", (message) => {
      const args = parseArgs(message, this.changename);
      if (message.channel.name !== "change-my-nickname") {
        message.channel.send(`Please use #change-my-nickname.`);
        return;
      }
      message.member.setNickname(args);
      message.channel.send(`Changed your name!`);
    }, true);

    this.help = new Command("help", (msg) => {
      const commandsList = fs.readFileSync("Storage/commands.txt", "utf8");

      message.channel.send(commandsList);
    });

    this.test = new Command("test", (message) => {
      const args = parseArgs(message, this.test);
      message.channel.send(`Changed your name!`);
      message.member.setNickname(args);
    }, true);

    this.ver = new Command("ver", (message) => {
      message.channel.send("16");
    })

    this.commands = [this.changename, this.test, this.ver, this.rankwin, this.link]; // commands only work after they're added to this array
  }
  on_message(message) { }
}
function parseArgsSplit(message, command) { // Splits args into array before returning
  return message.content.replace(config.prefix + command.name, "").trim().split(" ");
}
function parseArgs(message, command) { // Just removes the command and returns
  return message.content.replace(config.prefix + command.name, "").trim();
}
function parseArgsClean(message, command) {
  return message.cleanContent.replace(config.prefix + command.name, "").trim();
}

const handlers = {
  ChatHandler: new ChatHandler(),
};

bot.on("ready", () => {
  for (let key in handlers) {
    const val = handlers[key];
    if (val.on_ready) {
      val.on_ready();
    }
  }
  loop();
  for (let i of bot.channels.array()) {
    if (i.type == "text") {
      let ch = i;
      channels[ch.name] = ch;
    }
  }
  guild = bot.guilds.get(config.guildId);
  testChannel = bot.guilds.get(config.testGuildId).channels.get(config.testGuildChannel);
  console.log("Bot Launched...");

  bot.user.setGame("Fortnite Team Finder");
});
// main loop function, use this for timers
// this will probably use quite a bit of cpu, sorry :(
function loop() {
  for (let key in handlers) {
    const val = handlers[key];
    if (val.on_loop) {
      val.on_loop();
    }
  }
  setTimeout(loop, 50);
}
// message/command handler
bot.on("message", message => {
  if (message.author.id !== bot.user.id) {
    for (let key in handlers) {
      const val = handlers[key];
      val.on_message(message);
      if (val.commands) {
        for (let command of val.commands) {
          if ((message.content == config.prefix + command.name && !command.hasArgs) || (message.content.startsWith(config.prefix + command.name + " "))) {
            command.main(message);
            if (val.on_command)
              val.on_command(message, command);
            break;
          }
        }
      }
    }
  }
});

bot.login("NDExOTU4NzM2MDQzNjM4Nzg0.DWHWuA.Xg7_yaFMuyvzPE-lENbO-oxLa3E");
