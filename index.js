import { Embed } from "@discordjs/builders";
import Discord, { Client, Guild, GuildApplicationCommandManager, Intents, Message } from "discord.js"
import dotenv from "dotenv"
dotenv.config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})
const { blacklist } = require("./blacklist.json");
const express = require('express')
const app = express()
const port = 3000
let Canvas = require('canvas')
Canvas.registerFont('./Fonts/OFL.txt', { family: 'Shippori Antique' })

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
}
)
client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Looking For New Discord User Join In" } }) //this is the bot status code..
    console.log(`${client.user.username} đã sẵn sàng hoạt động!`);
    console.catch(console.error)
})

client.on("guildMemberAdd", member => {
    if (member.guild.id === "902020518717321237") { //enable your developer mode in your discord settings and right click your server.. then you should see copy id option...


        client.channels.cache.get("902346854451265616").send(`Welcome ${member}!! Thanks for joining the server.. Hope you enjoy your stay here :D`)
    }
})


client.on('ready', () => {
    console.log('Bot Is Ready!')
})
client.on('message', (message) => {
    if (message.content === "Hey Blocky!") {
        message.reply({
            content: "I'm Here!"
        })
        if (message.content.startsWith("B!ban")) {
            if (message.member.hasPermission("BAN_MEMBERS")) {
                let member = message.mentions.members.first();
                if (!member) message.channel.send("Please mention someone");
                if (message.member.roles.cache.has("910743487912214528")) {
                    member.ban().then(mem => {
                        message.reply(`Banned ${mem.user.username}!`);
                    });
                } else {
                    message.reply("You don't have the permission to do that...");
                }
            }
            if (message.content.startsWith("B!unban")) {
                message.reply = "Unbanned";
                let args = message.content.split(" ").slice(1);
                const id = args[0];
                message.guild.members.unban(id);
            }
    }}
})

 client.on("message", (message) => {
     if(message.content === "Can You Play Music?") {
         message.reply({
             content: "Yea I Can. Say B!Help To Get More Information"
         })
         if (message.content.startsWith("B!warn")) {
             if (message.member.hasPermission("MANAGE_MESSAGES")) {
                 let args = message.content.split(" ").slice(1);

                 let victim = message.mentions.users.first();
                 if (!args[0])
                     return message.channel.send("`B!warn @user (reason)` :fghjkl: ");

                 let embed = new Discord.MessageEmbed()
                     .setTitle("Warned")
                     .setDescription(args.join(" "))
                     .setThumbnail("")
                     .setColor("BLUE")
                     .setFooter(`Moderater : ${message.author.username}`)
                     .setTimestamp();

                 message.channel.send(embed);
             } else {
                 message.reply("You don't have permission to do that!");
             }
         }
    }
})

client.on("message", message => {
    if (message.content === "Blocky Super Seas Is The Best") {
        message.reply("YEA HERE THE DISCORD LINK:https://discord.gg/u3uHSccGxB");
    }
    if (message.content.startsWith("B!kick")) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            let member = message.mentions.members.first();
            if (!member) message.channel.send("Please mention someone");
            else {
                member.kick().then(mem => {
                    message.reply(`Kicked ${mem.user.username}!`);
                });
            }
        } else {
            message.reply("You don't have the permission to do that...");
        }
    }
    if (
        message.content.toLowerCase().includes("nitro") &&
        message.content.toLowerCase().includes("http")
    ) {
        message.delete();
    }
    if (
        message.content.startsWith("$avatar") ||
        message.content.startsWith(`$av`)
    ) {
    }
});

client.on("message", message => {
    if (message.content === "Link Youtube Write") {
        message.reply("https://www.youtube.com/channel/UCejNa505ie49-MsbZHzRy4w/featured");
    }
    if (message.content.startsWith("B!adminhelp")) {
        let embed = new
            Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("List Of Commands")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription("Credit:Block(King Of Mysterious)")
            .addFields({ name: "Admin Command", value: "Only For Admin" },
                { name: "B!ban", value: "Ban One Player (B!ban Someone Reason)" },
                { name: "B!kick", value: "Kick One Player (B!kick Someone" },
                { name: "B!warn", value: "Warn One Player (B!warn Someone" })
            .setFooter(":D")
        message.channel.send(embed)
    }
})

client.on('guildMemberAdd', async member => { /*Must be in async*/
    if (member.guild.id === '902020518717321237'/*NOTE YOU MUST BE IN DEVELOPER MODE*/) {
        let canvas = Canvas.createCanvas(1200, 490)// create a canvas 1200 - width | 490 - height
        let ctx = canvas.getContext('2d') //get the context

        let bg = await Canvas.loadImage('https://w.wallhaven.cc/full/r2/wallhaven-r2eoj7.jpg') // any background you want
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fillRect(0, 85, canvas.width, 313)

        ctx.font = '47px  Shippori Antique'
        ctx.strokeStyle = '#707586'
        ctx.lineWidth = 4
        let welcomstroke = 'Welcome'
        ctx.strokeText(welcomstroke, 370, 194)

        ctx.font = '47px  Shippori Antique'
        ctx.fillStyle = '#ffffff'
        let welcom = 'Welcome'
        ctx.fillText(welcom, 370, 194)

        ctx.font = '70px  Shippori Antique'
        let dot = '•'
        ctx.fillStyle = '#ffffff'
        ctx.fillText(dot, 547, 310)

        ctx.font = '50px  Shippori Antique'
        let discrimstroke = '#' + member.user.discriminator
        ctx.strokeStyle = '#333641'
        ctx.lineWidth = 3
        ctx.strokeText(discrimstroke, 360, 310)

        ctx.font = '50px  Shippori Antique'
        const memstroke = member.guild.memberCount
        let totalstroke = `#${memstroke.toLocaleString()} Member` //toLocaleString(): 1000 - 1,000 remove it if you want
        ctx.strokeStyle = '#939ea7'
        ctx.lineWidth = 3
        ctx.strokeText(totalstroke, 586, 310)

        ctx.font = '50px  Shippori Antique'
        const mem = member.guild.memberCount
        let total = `#${mem.toLocaleString()} Member` //toLocaleString(): 1000 - 1,000 remove it if you want
        ctx.fillStyle = '#dce0e3'
        ctx.fillText(total, 586, 310)

        ctx.font = '50px  Shippori Antique'
        let discrim = '#' + member.user.discriminator
        ctx.fillStyle = '#666970'
        ctx.fillText(discrim, 360, 310)

        ctx.strokeStyle = '#3d3d3d'
        ctx.font = '71px  Shippori Antique'
        let namestroke = member.user.username
        let namestrokecut = namestroke.length > 18 ? namestroke.substring(0, 18).trim() : namestroke
        ctx.shadowColor = '#3d3d3d'
        ctx.shadowBlur = 10
        ctx.lineWidth = 5
        ctx.strokeText(namestrokecut, 370, 259)

        ctx.fillStyle = '#ffffff'
        ctx.font = '71px  Shippori Antique'
        let name = member.user.username
        let namecut = name.length > 18 ? name.substring(0, 18).trim() : name
        ctx.fillText(namecut, 370, 259)

        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 20
        ctx.strokeRect(25, 85, 312, 312)

        let av = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' })) //the users avatar
        ctx.drawImage(av, 25, 85, 312, 312)

        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hello.png' /*name it whatever you want can example - h.png*/)
        client.channels.cache.get('902346854451265616' /*Again you must be in developer mode*/).send(`A very cool and creative message`, attachment)
    }
})

client.on('message', (message) => {
    if(message.content === "Link Discord TechyKeith") {
        message.reply({
            content: "He Is Making That. Be Patience To Enter He Discord :)"
        })
        if (message.content === "!!membercount") {
            let embed = new Discord.MessageEmbed()
                .setColor("#fca4a4")
                .setAuthor(`Member Count of ${message.guild}`, message.guild.iconURL({ dynamic: true }))
                .setTitle("Members")
                .setDescription(`Total: ${message.guild.members.cache.size}\n Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setFooter(`Requested by ${message.author.username}`)

            message.channel.send(embed)
        }
        module.exports = {
  name: "poll",
               category: "utility",
                   description: "description",
                       run: async (client, message, args) => {
                         
                               if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You don't have permission to use this command. \n``` Required permmission: MANAGE_MESSAGES ```");
                           if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.channel.send("```Error: Permmission missing! \nI need `MANAGE_MESSAGES` permission this this channel. ```");
                         
                               let pollchannel = message.mentions.channels.first();
                           let firstemoji = args[1];
                           let secondemoji = args[2];
                           let pollmessage = args.slice(3).join(" ");
                         
                             
                             
                             
                               if (!pollchannel) {
                                     const embed1 = new Discord.MessageEmbed()
                                         .setTitle(message.author.username)
                                         .setDescription(`❎  Please mention the channel first! \nUsage: ?poll <channel> <first emoji> <second emoji> <message> , Emoji must be from this server`)
                                         return message.channel.send(embed1)
                                           }
                         
                               if (!firstemoji) {
                                     const embed3 = new Discord.MessageEmbed()
                                         .setTitle(message.author.username)
                                         .setDescription(`❎  Please give the first emoji! \nUsage: ?poll <channel> <first emoji> <second emoji> <message> , Emoji must be from this server`)
                                         return message.channel.send(embed3)
                                           }
                         
                               if (!secondemoji) {
                                     const embed4 = new Discord.MessageEmbed()
                                         .setTitle(message.author.username)
                                         .setDescription(`❎  Please give the second emoji! \nUsage: ?poll <channel> <first emoji> <second emoji> <message> , Emoji must be from this server`)
                                         return message.channel.send(embed4)
                                           }
                              if (!args.slice(3).join(" ")) {
                                    const embed2 = new Discord.MessageEmbed()
                                        .setTitle(message.author.username)
                                       .setDescription(`❎  You did not specify your poll message! \nUsage: ?poll <channel> <first emoji> <second emoji> <message> , Emoji must be from this server`)
                                        return message.channel.send(embed2)
                                          }
                        
                            
                            
                                const embed5 = new Discord.MessageEmbed()
                                    .setTitle(`Poll started by ${message.author.username}`)
                                    .setDescription(`**${pollmessage}**`)
                                
                                    const sendEmbed = await pollchannel.send(embed5);
                        
                            
                                sendEmbed.react(firstemoji)
                            
                                sendEmbed.react(secondemoji)
                            
                                const embed6 = new Discord.MessageEmbed()
                                    .setTitle(message.author.username)
                                   .setDescription("✅  Poll created successfully! \n\nIf bot don't react to the poll message: \n```Make sure you have given the emoji from this server \nUsage: ?poll <channel> <first emoji> <second emoji> <message>```")
                                
                                  const finalEmbed = await message.channel.send(embed6);
                        
                                message.delete({ timeout: 10000 })
                             finalEmbed.delete({ timeout: 15000 })
                            
                            
                            
                            
                            }
        };
        if(message.content.toLowerCase().startsWith("B!balance") || message.content.toLowerCase().startsWith("B!bal")) {
            let balance = await.get.db(`wallet_${message.author.id}`)
            let bank = await.get.db(`bank_${message.author.id}`)

            if(balance = null) balance = 0
            if(bank = null) bank = 0
            message.channel.send(`Your Wallet Have:${message.author.id} Your Bank Have:${message.author.id}`)
        }
    }
})

client.login("OTAyMDE4ODc3NzU0NTk3Mzc2.YXYUiw.ipsRnvAzWvRgdPBTfCq_RQsuQSI")