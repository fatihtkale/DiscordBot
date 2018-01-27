module.exports.run = async (bot, message, args) => {
  // What will run when the command is called
  const fs = require("fs");
  const commandsList = fs.readFileSync("Storage/commands.txt", "utf8");

  message.channel.send(commandsList);
};

module.exports.config = {
  // Config for the command
  command: "help"
};
