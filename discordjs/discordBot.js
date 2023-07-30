const Discord = require('discord.js');
const client = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages
]})

async function initializeBot(discordBotToken) {
    try {
      await client.login(discordBotToken);
      console.log(`Logged in as ${client.user.tag}!`);
      return 'Bot initialized successfully!';
    } catch (error) {
      console.error('Error logging in:', error.message);
      return error.message;
    }
}

function sendMessageToChannel(channelId, message) {
    const channel = client.channels.cache.get(channelId);
    if (!channel) {
        return;
    }

    channel.send(message);
}

module.exports = { initializeBot, sendMessageToChannel };