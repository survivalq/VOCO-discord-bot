const { contextBridge, ipcRenderer } = require('electron');

// Way more secure practice than exposing the entire ipcRenderer object

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
});

contextBridge.exposeInMainWorld('discordBotAPI', {
    sendMessageToChannel: (channelId, message) => ipcRenderer.invoke('message', { channelId, message }),
    initializeBot: (discordBotToken) => ipcRenderer.invoke('initializeBot', discordBotToken)
});