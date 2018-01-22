// Import the discord.js module
const Discord = require("discord.js");

// Create an instance of a Discord client
const bot = new Discord.Client();

const fs = require("fs"); // requiering package from node no need to download anything

// Calling the userData file

const userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"));
const commandsList = fs.readFileSync("Storage/commands.txt", "utf8");
bot.commands = new Discord.Collection(); // Making a collection for all of our commands

fs.readdir("./commands/", (err, files) => {
  // Reads the directory of the commands folders
  if (err) console.error(err); // Sends an error message if it gets an error calling the commands

  const jsfiles = files.filter(f => f.split(".").pop() === "js"); // Checks the file extension for 'js', or the text after the . is 'js'
  if (jsfiles.length <= 0) {
    return console.log("No commands found...");
  } else {
    // returns and sends to console that no commands were found
    console.log(jsfiles.length + " Commands found.");
  } // Tells how many commands it found

  jsfiles.forEach((f, i) => {
    // Loops through each file
    const cmds = require(`./commands/${f}`); // Get every choosen file in the js folder
    console.log(`Command ${f} loading...`); // logs to the console that the command is loading
    bot.commands.set(cmds.config.command, cmds); // Gets the name of the command and the module in the file
  });
});



// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted

bot.on("ready", () => {
  console.log("Bot Launched..."); // Runs when the bot is launched

  bot.user.setGame("Fortnite Team Finder");

  // You can put any code you want here, it will run when you turn on the bot
});

// Create an event listener for messages
bot.on("message", message => {
  // Variables
  const msg = message.content;
  const prefix = "!";
  const cont = message.content.slice(prefix.length).split(" "); // Slices of the prefix and then puts it in a array
  const args = cont.slice(1); // Everything after the command in an array

  if (!message.content.startsWith(prefix)) return;

  const cmd = bot.commands.get(cont[0]); // Tries to grab the commands that we called
  if (cmd) cmd.run(bot, message, args); // This checks if it exsists, if it does it runs the command

  // Ignores the messages that the bot has sent.
  if (message.author.id === "373852565009596417") {
    // Checks if the id of the sender is the same as the bot
    return; // Cancels the events
  }
});

// Log our bot in
bot.login(process.env.TOKEN);