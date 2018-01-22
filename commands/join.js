module.exports.run = async (bot, message, args) => {
  if (message.channel.id === "396756899514679297") {
    var voiceChannels = ["396730543162654722", "396755836673720340"];
    //vars
    const pickChannel = voiceChannels[Math.floor(Math.random() * 2)];
    console.log("Channel chosen " + pickChannel);
    const channel = message.guild.channels.find("id", pickChannel);
    var UserNamesInVC = channel.members;
    //Mapping users in a voicechat
    var getUsersInVC = UserNamesInVC.map(function(x) {
        return x.user.username;
    });
    message.member.setVoiceChannel(channel);
    //Need to be in a voice chat to use the command
    if (message.member.voiceChannel == null) {
      message.channel.send(":x: You need to be in a voice channel to use that command");
    }else{
      message.channel.send(":crossed_swords: " + " You joined channel: " + channel.name + "\n" +":family: Your squad is: " + getUsersInVC);
      if (bot.channels.get(pickChannel).userLimit <= 2) {
        console.log("vc is full selecting new one");
        message.member.setVoiceChannel(channel);
      }
    }
  }
};
module.exports.config = {
  command: "join"
};
