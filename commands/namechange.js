module.exports.run = async (bot, message, args) => {
  var msgList = message.content.split(/\s+/);
  var name = msgList.toString();
  console.log(msgList);
  message.member.setNickname(msgList[1]);
};
module.exports.config = {
  command: "changename"
};
