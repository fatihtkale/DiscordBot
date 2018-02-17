// Import the discord.js module
const Discord = require("discord.js");

// Create an instance of a Discord client
const bot = new Discord.Client();
const config = {
  prefix: "!",
  guildId: "371603877289656320"
};

const fs = require("fs"); // requiering package from node no need to download anything
const userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"));
const commandsList = fs.readFileSync("Storage/commands.txt", "utf8");

var guild; // The Fortnite Team Finder Server
var channels = {}; // Channels of the server

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
        const Fortnite = require('fortnite');
        const client = new Fortnite('fc5c9c9c-0888-4f97-a5ff-1478a29b3c92');
        client.getInfo('faith2720', 'pc').then(data => { message.channel.send(data); }).catch(e => { message.channel.send("error"); });
    });
  
    // !changename -- Changes the user's nickname
    this.changename = new Command("changename", (message) => {
      const args = parseArgs(message, this.changename);
      if (message.channel.id !== channels["change-my-nickname"].id) {
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
      message.channel.send("6");
    })


    this.commands = [this.changename, this.test, this.ver, this.rankwin]; // commands only work after they're added to this array
  }
  on_message(message) { }
}
function parseArgsSplit(message, command) { // Splits args into array before returning
  return message.content.replace(config.prefix + command.name, "").trim().split(" ");
}
function parseArgs(message, command) { // Just removes the command and returns
  return message.content.replace(config.prefix + command.name, "").trim();
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