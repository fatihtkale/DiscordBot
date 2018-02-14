module.exports.run = async (bot, message, args) => {  

  if(message.channel.id === "404609521579982851"){
    changename();
    function changename(){
      var name = args.join(" ");
      console.log(name);
      bot.channels.get("404609521579982851").send("Changed name");
      message.member.setNickname(name);
    }
  }
  if(message.channel.id != "404609521579982851"){
    message.channel.send("Please use #change-my-name");
  }
};
module.exports.config = {
  command: "changename"
};
