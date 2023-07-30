const { ipcMain } = require('electron');
const { initializeBot, sendMessageToChannel } = require('./discordBot');

ipcMain.handle('message', async (event, arg) => {
    const { channelId, message } = arg;
    sendMessageToChannel(channelId, message);
});

ipcMain.handle('initializeBot', async (event, arg) => {
    const response = await initializeBot(arg);
    return response;
});