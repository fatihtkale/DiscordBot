module.exports.run = async (bot, message, args) => {// What will run when the command is called
  // Send "pong" to the same channel
  message.channel.send("pong");
};

module.exports.config = {
  // Config for the command
  command: "ping"
};
