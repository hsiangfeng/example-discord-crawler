require('dotenv').config(); // 引入 dotenv

const crawler = require('./crawler');
const postCron = require('./postCron');

const {
  Client,
  GatewayIntentBits,
  Partials,
  Events,
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
  ],
});

client.once(Events.ClientReady, () => {
  console.log('Ready!');
  postCron(client).start();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.commandName === 'blog') {
    const data = await crawler();
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomData = data[randomIndex];
    await interaction.reply(`隨機推薦一篇 Ray 的文章：[${randomData.title}](${randomData.url})`);
  }
});

client.login(process.env.DISCORD_TOKEN);

module.exports = client;