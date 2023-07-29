const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
require('./discordjs/ipc');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Important for IPC; Check TUTORIAL.md
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './dist/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})