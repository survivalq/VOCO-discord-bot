<template>
  <title-base title="Overview" boxIcon="bx bxs-home"/>

  <div class="mt-4">
    <label for="token" class="text-lg text-white mb-2">Discord Bot Token:</label>
    <div class="relative">
      <textarea
        v-model="discordBotToken"
        id="token"
        class="w-[650px] bg-[#302b3b] border border-gray-600 rounded-lg px-3 py-2 text-white"
        rows="1"
        placeholder="Enter your bot token..."
      ></textarea>
    </div>
  </div>

  <a @click="saveToken" class="border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-250 rounded-none text-white mt-4 px-7 py-2.5 cursor-pointer select-none">
    <i class="bx bxs-save mr-2 mt-10"></i> Save
  </a>

  <a @click="startBot" class="border-2 ml-2 border-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors duration-250 rounded-none text-white mt-4 px-7 py-2.5 cursor-pointer select-none">
    <i class="bx bx-check mr-2 mt-10"></i> Start Bot
  </a>
</template>

<script>
import { toast } from 'vue3-toastify';
import TitleBase from '../components/titles/TitleBase.vue';
const { ipcRenderer } = require('electron');

export default {
  name: 'Overview',
  components: {
    TitleBase,
  },
  data() {
    return {
      discordBotToken: '',
    };
  },
  mounted() {
    const storedToken = localStorage.getItem('discordBotToken');
    if (storedToken) {
      this.discordBotToken = storedToken;
    }
  },
  methods: {
    saveToken() {
      // Save the Discord bot token to localStorage
      if (this.discordBotToken.trim()) {
        localStorage.setItem('discordBotToken', this.discordBotToken.trim());
        toast.info("Token saved successfully!", {
            theme: "dark",
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
      } else {
        toast.warn("Please enter a valid Discord bot token before saving.", {
            theme: "dark",
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
      }
    },

    startBot() {
      if (this.discordBotToken.trim()) {
        ipcRenderer.send('initializeBot', this.discordBotToken);
        toast.success("Bot started successfully!", {
            theme: "dark",
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
      } else {
        toast.warn("Please enter a valid Discord bot token before starting.", {
            theme: "dark",
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
      }
    }
  },
};
</script>