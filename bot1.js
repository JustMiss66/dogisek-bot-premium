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
  let mods = message.guild.roles.find("name", "#~Moderator~#");
  
  //ping command ↓
  
  //if (!premium) return message.channel.send("Nejsi prémium!")
  
  if (cmd === `${prefix}say`){
    let saytxt = args.join(" ").slice(22)
  
    let premium = message.guild.roles.find("name", "★†Premium†★")
    if(!premium) return message.channel.send("Nemáš Prémium u Dogisek Bot!!")
  
    if(!saytxt) return message.channel.send("Použití: ``>say BlahBlahBlah lol``")

    message.channel.send(saytxt)
  }
  if (cmd === `${prefix}ping`) {
    let premium = message.guild.roles.find("name", "★†Premium†★");
    if (message.member.roles.has(premium.id)) {
  
    var embed = new Discord.RichEmbed()
    .setTitle("Ping")
    .setColor(0xffb200)
    .setTimestamp()
    .addField(":ping_pong:", "Pong!");
 // if (!premium) return message.channel.send("Nejsi Prémium!");
    message.channel.send(embed);
    return;
    } else {
    message.reply("Nejsi Prémium!")
    }
  }
  //warn prikaz ↓
  if (cmd === `${prefix}warn`) {
    let logs = message.guild.channels.find(`name`, "logs")
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let reason = args.join(" ").slice(22);
    let mods = message.guild.roles.find("name", "#~Moderator~#")
    if (message.member.roles.has(mods.id)) {
    var embed = new Discord.RichEmbed()
    .setTitle("Varování")
    .setTimestamp()
    .addField("Varován:", wUser)
    .addField("Moderátor:", message.author.username)
    .addField("Důvod:", reason)
    .setColor("#ffff00")
    .setFooter("Moderátor " + message.author.username + " varoval " + wUser);
    logs.send(embed)
    } else {
      message.reply("Nejsi moderátor!")
    }
    if (!logs) return message.channel.send("Není tu ``logs`` channal!")
  }
  //test command ↓
  if (cmd === `${prefix}emb`){
    var embed = new Discord.RichEmbed()
    
    
    .setAuthor("test", message.author.avatarURL, "https://discord.gg/9rTcHkA")
    .addField("test invite", "[click here](https://discord.gg/qg2VcHc)");
    
    
    message.channel.send(embed)
  }
  
  //help command ↓
  if (cmd === `${prefix}help`) {
    let premium = message.guild.roles.find("name", "★†Premium†★");
    if (message.member.roles.has(premium.id)) {
    var embed = new Discord.RichEmbed()
    .setTitle("Pomoc!")
    .setColor("GREEN")
    .setFooter(message.author.username + " potřebuje pomoc :)")
    .setTimestamp()
    .addField("P>modhelp")
    .addField("P>generalhelp");
    message.channel.send(embed)
    } else {
      message.reply("Nejsi premium!")
    }
  }
  //generL help command ↓
  if (cmd === `${prefix}generalhelp`){
    var embed = new Discord.RichEmbed()
    .setTitle("Pomoc pro Prémium!")
    .setColor(0xffff00)
    .addField("P>ping", "Ukáže ti ping bota!")
    .addField("P>say", "Bot nèco řekne.")
    .setTimestamp()
    .setFooter(message.author.username + "Potřeboval pomoc!");
    message.channel.send(embed)
    
  }
  //kick command ↓
  if (cmd === `${prefix}kick`){
    let kUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let reason = args.join(" ").slice(22);
    let mod = message.guild.roles.find("name", "#~Moderator~#");
    let logs = message.guild.channels.find(`name`, "logs");
    if (!kUser) return message.channel.send("Nemůžeš vyhodit vzduch :joy: (P>kick ``@člověk`` důvod");
    if (!reason) return message.channel.send("Prosím zadejte důvod (P>kick @Člověk ``Důvod``)");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nemohu tohoto člověka kicknout");
    if (!mod) return message.channel.send("Nemáš práva!");
    
    var embed = new Discord.RichEmbed()
    .setTitle("Kick oznámení")
    .setTimestamp()
    .addField("Kicknutej:", kUser)
    .addField("Moderator:", message.author.username)
    .addField("Důvod:", reason)
    .setColor("#af3636");
    
    message.guild.member(kUser).kick(reason)
    logs.send(embed)
  
   
  }
  if (cmd === `${prefix}ban`){
    let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let reason = args.join(" ").slice(22);
    let admin = message.guild.roles.find("name", "%~Admin~%");
    let logs = message.guild.channels.find(`name`, "logs");
    if (!bUser) return message.channel.send("Nemůžeš vyhodit vzduch :joy: (P>ban ``@člověk`` důvod");
    if (!reason) return message.channel.send("Prosím zadejte důvod (P>ban @Člověk ``Důvod``)");
    if (bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nemohu tohoto člověka zabanovat!");
    if (!admin) return message.channel.send("Nemáš práva!");
    
    var embed = new Discord.RichEmbed()
    .setTitle("Ban oznámení")
    .setTimestamp()
    .addField("Zabanovanej:", bUser)
    .addField("Moderator:", message.author.username)
    .addField("Důvod:", reason)
    .setColor("#f40c3a");
    
    message.guild.member(bUser).ban(reason)
    logs.send(embed)
  }
  if (cmd === `${prefix}modhelp`){
    var embed = new Discord.RichEmbed()
    .setTitle("Pomoc pro moderátory!")
    .setTimestamp()
    .setFooter(message.author.avatarURL + "Pomoc potřeboval:" + message.author.username)
    .setColor("#30a566")
    .addField("P>ban", "Zabanuje uživatele.")
    .addField("P>warn", "Varuje uživatele.")
    .addField("P>kick", "Vyhodí uživatele.");
    message.channel.send(embed)
              
  }
});


bot.login(process.env.token);
