## Tutorial for Vue3.js + Electron.js

### Prerequisites
- Make sure these following dependencies are installed:

* [Vue 3](https://v3.vuejs.org/) (Set it up with Vite)
* [Electron](https://www.electronjs.org/) (Follow the [Quick Start Guide](https://www.electronjs.org/docs/tutorial/quick-start))
* [Electron Forge](https://www.electronforge.io/)

### Setting up Vue 3 and Electron
- I've come across a few tutorials, but none of them worked for me. So here's a guide to make Vue 3 and Electron work together.

- Make sure vite is configured correctly like so:
```js
// vite.config.js
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: "./", // Make sure this is set to "./", since this is needed when building a dist/ folder
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

- Modify the `router/index.js` file to use `createWebHashHistory()` (Also this depends if you are using Vue Router):
```js
// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';

// Your routes and router setup here

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // Your routes here
  ],
});

export default router;
```

- Update your App.vue (example) file to use window.myAPI (This is important for IPC communication between the main and renderer process):
```js
// App.vue (this is a example!)
<template>
  <div>
    <button @click="sendMessageToElectron">Send Message</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    sendMessageToElectron() {
      window.myAPI.messageElectron('Hello Electron!'); // https://www.electronjs.org/docs/latest/tutorial/ipc - it shows how to use IPC and build a communication between the main and renderer process
    },
  },
};
</script>
```

- In the `main.js` (Electron main process file), enable the necessary `web preferences`:
```js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // Closes the nodeIntegration for security reasons
      contextIsolation: true, // This is important for security reasons
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './dist/index.html'), // Also this is important for loading the index.html file from the dist/ folder
      protocol: 'file:',
      slashes: true,
    })
  );

  // Uncomment the following line to open the DevTools
  // mainWindow.webContents.openDevTools();
}
```

- After that, you can now build your Vue 3 + Electron app with `npm run build` and run it with `npm run start`!
- If you want to use Tailwind CSS, you can follow the [Tailwind CSS + Vite guide](https://tailwindcss.com/docs/guides/vue-3-vite).