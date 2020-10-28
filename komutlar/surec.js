const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db')
const prettyMilliseconds = require('pretty-ms');

exports.run = async (client, message) => {
        let user = message.mentions.users.first() || message.author
        let bal = db.fetch(`Voice.${message.guild.id}.${user.id}`)
        let TopMsg = db.all(`Msg.${message.guild.id}`)
      TopMsg.sort((a, b) => {
        return b.data - a.data
      })

      
      let BalID = TopMsg.map((g) => g.ID.split("_")[2])

      
      let TopUser = BalID.indexOf(user.id)+1
      if(bal === null) bal = "0 (henüz sunucuda sesiniz yok)"
      if(!TopUser) TopUser = "(Siz sıralamada değilsiniz)"
  
        let embed = new Discord.RichEmbed()
        .setTitle("İşte sunucudaki ses açısından ilerlemeniz")
        .setDescription(`
        (Loz Bey Kodlamasıdır <3 )

> > **Sesle harcanan zaman**
> ${prettyMilliseconds(bal)}
> > **Sıralamadaki yeriniz**
> ${TopUser}
`)
    .setColor(`#dc143c`)
    .setThumbnail(`${user.displayAvatarURL}`)
    .setFooter(`demande de ${message.author.username}`, message.guild.iconURL)
  
         return message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: "info",
  description: "Bot bulunduğunuz odaya girer.",
  usage: "info",
};