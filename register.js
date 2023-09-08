require('dotenv').config(); // 引入 dotenv

const {
  REST,
  Routes
} = require('discord.js');

const list = [
  {
    name: 'blog',
    description: '取得首頁第一頁隨機文章',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const registerCommands = async (commands) => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

registerCommands(list)