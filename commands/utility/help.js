const Discord = require('discord.js');
const config = require('../../config');
const fetch = require('node-fetch')
const fs = require("fs")
const { PREFIX } = require("../../config")
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const {
  MessageEmbed,
  MessageAttachment
} = require('discord.js');
const {
  MessageMenuOption,
  MessageMenu
} = require("discord-buttons");

module.exports = {
    // config: {
    //     name: 'clyde',
    //     description: 'Shows your text as Clyde\'s message',
    //     aliases: ["clyde"],
    //     usage: '<text>',
    //     accessableby: "",
    // },
    config: {
    name: "help",
    description: "Help Menu",
    usage: "1) m/help \n2) m/help [module name]\n3) m/help [command (name or alias)]",
    example: "1) m/help\n2) m/help utility\n3) m/help ban",
    aliases: ['h']
},
    run: async (client, message, args) => {
  let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };

    let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;

// if(message.content.toLowerCase() === `!help`){
         const embed = new MessageEmbed()
          .setTitle("__**Welcome to My Help Menu**__")
          
          // .addField("Important Links:", ` • [Invite Me](${process.env.INVITE}) • [Website](${process.env.WEBSITE}) • [Support](${process.env.SUPPORT})`, true)
          .setColor("BLUE")
         //  .setImage(ee.helpgif)
          .setFooter(`Home Page | ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()


        const embed1 = new MessageEmbed()
          .setDescription(`⚙️︱__**MODERATION**__\n\n\`Ban\`, \`Kick\`, \`vcmove\`, \`smove\`, \`voicekick\`, \`lock\`, \`unlock\`, \`Unban\`, \`Mute\`, \`Purge\`, \`Hackban\`, \`role\`, \`roleadd\`, \`roledel\`, \`rolecreate\`, \`deleterole\`, \`createvc\`, \`createchat\`, \`delchannel\`, \``)
          .setColor("BLUE")
          .setThumbnail(client.user.displayAvatarURL({
            dynamic: true
          }))
         //  .setImage(ee.helpgif)
          .setFooter(`Page 1/4 | ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()

        const embed2 = new MessageEmbed()
          .setDescription(`🛡️︱__**SETUP SYSTEM**__\n\n\`setmodlog\`, \`setmute\`, \`setnick\`, \`slowmode\`, \`help\`, \`uptime\`, \`av\`, \`av2\`, \`stats\`, \`channelinfo\`, \`roleinfo\`, \`whois\`,\``)
          .setColor("BLUE")
          .setThumbnail(client.user.displayAvatarURL({
            dynamic: true
          }))
         //  .setImage(ee.helpgif)
          .setFooter(`Page 2/4 | ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()

        const embed3 = new MessageEmbed()
          .setDescription(`🤣︱__**FUN**__\n\n\`kiss\`, \`hug\`, \`pat\`, \`zaglo\`, \`slap\`, \`smug\`, \`tickle\`, \`poke\`, \`binary\`, \`calculate\`, \`lovecal\`, \`meme\`, \`advice\`, \`scroll\, \`triggered\`, \`delete\`, \`rip\`, \`jail\`, \`captcha\`, \`wideavatar\`, \`toilet\`, \`wa\`, \`clyde\`, \`wasted\`, \`effect\`, \`tweet\`, \`minecraft\`, \`blur\`, \`beautiful\`, \`catsay\`, \`cowsay\`, \`fliptext\``)
          .setColor("BLUE")
          .setThumbnail(client.user.displayAvatarURL({
            dynamic: true
          }))
         //  .setImage(ee.helpgif)
          .setFooter(`Page 3/4 | ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()

        const embed4 = new MessageEmbed()
          .setDescription(`🌟︱__**MAIN**__\n\n\`announce\`, \`imageannounce\`, \`membercount\`, \`yt\`, \`steal\`, \`define\`, \`sourcebin\`, \`docs\`, \`weather\`, \`qr\`,\`applestore\`, \`anime\`, \`linkshorten\`, \`playstore\`, \`country\`, \`ascii\`, \`emojiid\`, \`vaportext\`,\`embed\``)
          .setColor("BLUE")
   
          
        
         //  .setImage(ee.helpgif)
          .setFooter(`Page 4/4 | ${client.user.username}`, client.user.displayAvatarURL())
          .setTimestamp()
    
    //-----------------------------OPTIONS----------------------

        let option1 = new MessageMenuOption()
          .setLabel('Home')
          .setEmoji('🏘️')
          .setValue('option1')
          .setDescription('Home')

        let option2 = new MessageMenuOption()
          .setLabel('Moderation')
          .setEmoji('⚙️')
          .setValue('option2')
          .setDescription('Moderation')

        let option3 = new MessageMenuOption()
          .setLabel('Setup')
          .setEmoji('🛡️')
          .setValue('option3')
          .setDescription('Setup')

        let option4 = new MessageMenuOption()
          .setLabel('Fun')
          .setEmoji('🤣')
          .setValue('option4')
          .setDescription('Fun')

          let option5 = new MessageMenuOption()
          .setLabel('MINE')
          .setEmoji('🌟')
          .setValue('option5')
          .setDescription('ADVANCED SETTINGS')
         
        let select = new MessageMenu()
          .setID('selector')
          .setPlaceholder('Click here to view the help menu!')
          .setMaxValues(1)
          .setMinValues(1)
          .addOptions(option1, option2, option3, option4, option5)

        //-----------------------------OPTIONS----------------------//

        const Sendmenu = await message.channel.send(embed, select);

        const filter = (button) => button.clicker.user.id === message.author.id; //if only the message author click then it will work
        let collector = Sendmenu.createMenuCollector(filter, {
          time: 100000
        });

        collector.on("collect", (b) => {
          if (b.values[0] == "option1") {
            Sendmenu.edit(embed, select)
          }

          if (b.values[0] == "option2") {
            Sendmenu.edit(embed1, select)
          }

          if (b.values[0] == "option3") {
            Sendmenu.edit(embed2, select)
          }

          if (b.values[0] == "option4") {
            Sendmenu.edit(embed3, select)
          }

          if (b.values[0] == "option5") {
            Sendmenu.edit(embed4, select)
          }

        
          b.reply.defer();
        })

        collector.on("end", (b) => {
          Sendmenu.edit(`This Help Menu is expired! Please retype \`!help\` to view again.`)
        })
        //.catch(err => console.log(err))
  
    }
}