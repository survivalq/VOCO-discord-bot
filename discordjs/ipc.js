const { ipcMain } = require('electron');
const { initializeBot, sendMessageToChannel } = require('./discordBot');

ipcMain.on("message", (event, arg) => {
    const { channelId, message } = arg;
    sendMessageToChannel(channelId, message);
});

ipcMain.on("initializeBot", (event, arg) => {
    setImmediate(async () => {
        await initializeBot(arg);
    });
});