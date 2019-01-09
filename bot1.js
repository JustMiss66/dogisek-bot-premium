const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const prefix = "P>";

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online with prefix P>!`);
  
  bot.user.setActivity("Všechny prémium! [P>]", {type: "WATCHING"});
});

bot.on("message", async message => {

  if (message.author.bot) return;
  
  let prefix = "P>"
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)
  //ping command
  if(cmd === `${prefix}ping`){
    var embed = new Discord.RichEmbed()
    .setTitle("Ping")
    .addField(":ping_pong:", "Pong!");
    message.content.sendEmbed(embed)
    return;
  }
});


bot.login(process.env.token);
