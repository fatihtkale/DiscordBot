module.exports.run = async (bot, message, args) => {
  if (message.channel.id === "404609521579982851") {
    var name = args.join(" ");
    console.log(name);
    bot.channels.get("404609521579982851").send("Changed name");
    message.member.setNickname(name);
  }
  else {
    if (message.channel.id === "404609521579982851") {
      changename();
    }
    function changename() {
      var msgList = message.content.split(/\s+/);
      var name = msgList.toString();
      console.log(msgList);
      message.channel.send("Changed name");
      message.member.setNickname(msgList[1]);
    }
    if (message.channel.id != "404609521579982851") {
      message.channel.send("Please use #change-my-name");
    }
  }
};

module.exports.config = {
  // Config for the command
  command: "namechange"
};
