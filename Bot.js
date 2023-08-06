const express = require('express');
const app  = express();
const token = 'MTExODk0OTk4OTE1OTI4OTAyNA.GvBiBw.9VsJdnlg1PkqR39rzwEJQs7m8hyVPnL16m-XOc'
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

console.log('Project is running!')

const client = new Discord.Client({ intents: ['Guilds','GuildMessages','MessageContent'], partials: [Discord.Partials.Channel] });
const api = 'https://soopy.dev/api/v2/connected';
const snekfetch = require('snekfetch');
const prefix = "-"

client.login(token)

async function deleteUserMessagesInChannel(userId, channelId, count = 100) {
  const channel = await client.channels.fetch(channelId);
  console.log(channel)
  const messages = await channel._messages.fetch({ limit: count });
  messages.forEach(message => {
    if(message.author.id === userId) {
      message.delete()
    }
  });
}

deleteUserMessagesInChannel('1118949989159289024', '1137443629175164999')

setInterval(() => {
    try {
      snekfetch.get(api).then(r => {
      let answer = JSON.stringify(r.body.connected)
        if(answer > 8000) {
          const Obliteration = new EmbedBuilder()
            .setColor(0x000000)
            .setTitle('Soopy Server status')
            .setFooter({ text: 'blubbie.', iconURL: 'https://i.imgur.com/iruspaQ.png'})
            .setThumbnail('https://i.imgur.com/x1sGe9W.png')
            .setDescription('Current status: being obliterated')
            .addFields(
              { name: ' ', value: ' '},
              { name: 'people connected', value: (answer), inline: true},
              { name: 'Current features disabled', value: 'everything with an api connection', inline: true }
            )
          channel.send({ embeds: [Obliteration]}).then(msg => setTimeout(() => msg.delete(), 5000))
        }
        else if (answer > 6000) {
          const InPain = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Soopy Server Status')
            .setFooter({ text: 'blubbie.', iconURL: 'https://i.imgur.com/iruspaQ.png'})
            .setThumbnail('https://i.imgur.com/x1sGe9W.png')
            .setDescription('Current status: on fire')
            .addFields(
              { name: ' ', value: ' '},
              { name: 'people connected', value: (answer), inline: true },
              { name: 'Current features disabled', value: 'item worth\nstat next to name', inline: true }
            )
          channel.send({ embeds: [InPain]}).then(msg => setTimeout(() => msg.delete(), 5000))
        }
        else if(answer > 5000) {
          const SendHelp = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Soopy Server Status')
            .setFooter({ text: 'blubbie.', iconURL: 'https://i.imgur.com/iruspaQ.png'})
            .setThumbnail('https://i.imgur.com/x1sGe9W.png')
            .setDescription('Current status: in pain')
            .addFields(
              { name: ' ', value: ' '},
              { name: 'people connected', value: (answer), inline: true},
              { name: 'Current features disabled', value: 'item worth', inline: true}
            )
          channel.send({ embeds: [SendHelp]}).then(msg => setTimeout(() => msg.delete(), 5000))
          }
        else if(answer < 5000) {
          const Okay = new EmbedBuilder()
            .setColor(0x008000)
            .setTitle('Soopy Server Status')
            .setFooter({ text: 'blubbie.', iconURL: 'https://i.imgur.com/iruspaQ.png'})
            .setThumbnail('https://i.imgur.com/x1sGe9W.png')
            .setDescription('Current status: okay')
            .addFields(
              { name: ' ', value: ' '},
              { name: 'people connected', value: (answer), inline: true},
              { name: 'current features disabled', value: 'none!', inline: true}
            )
          channel.send({ embeds: [Okay]}).then(msg => setTimeout(() => msg.delete(), 5000))
        }

      })
     } catch(e) {
      const NotReachable = new EmbedBuilder()
        .setColor(0x808080)
        .setTitle('Soopy Server Status')
        .setFooter({ text: 'blubbie.', iconURL: 'https://i.imgur.com/iruspaQ.png'})
        .setThumbnail('https://i.imgur.com/x1sGe9W.png')
        .setDescription('Current status: being obliterated')
        .addFields(
          { name: ' ', value: ' '},
          { name: 'people connected', value: 'ERROR: Server not reachable', inline: true},
          { name: 'current features disabled', value: 'everything with an api connection', inline: true}
        )
      channel.send({ embeds: [NotReachable]}).then(msg => setTimeout(() => msg.delete(), 5000))
      }
    }, 5000)

