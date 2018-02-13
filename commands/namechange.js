module.exports.run = async (bot, message, args) => {  
  if(message.channel.id === "404609521579982851"){
  var msgList = message.content.split(/\s+/);
  var name = msgList.toString();
  console.log(msgList);
  message.member.setNickname(msgList[1]);
  message.channel.send("Changed name");
  }
  if(message.channel.id != "404609521579982851"){
    message.channel.send("Please use #change-my-name");
  }
};
module.exports.config = {
  command: "changename"
};
