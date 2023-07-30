<template>
  <title-base title="Message" boxIcon="bx bxs-message-dots" />

    <div class="mt-4">
        <label for="channelid" class="text-lg text-white mb-2">Channel ID:</label>
        <div class="relative">
            <textarea v-model="channelId" id="channelid"
                class="w-[450px] bg-[#302b3b] border border-gray-600 rounded-lg px-3 py-2 text-white" rows="1"
                placeholder="Enter your channel id..."></textarea>
        </div>
    </div>

    <div class="mt-4">
        <label for="message" class="text-lg text-white mb-2">Message:</label>
        <div class="relative">
            <textarea v-model="message" id="message"
                class="w-[450px] bg-[#302b3b] border border-gray-600 rounded-lg px-3 py-2 text-white" rows="5"
                placeholder="Enter your message..."></textarea>
        </div>
    </div>

  <a @click="sendMessage()" class="border-2 border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-250 rounded-none text-white mt-4 px-7 py-2.5 cursor-pointer select-none">
			<i class="bx bxs-paper-plane mr-2 mt-10"></i> Send Message
	</a>
</template>

<script>
import { toast } from 'vue3-toastify';
import TitleBase from '../components/titles/TitleBase.vue';

export default {
  name: 'Message',
  components: {
    TitleBase,
  },
  data() {
    return {
      channelId: '',
      message: '',
    };
  },
  methods: {
    sendMessage() {
      if (!this.channelId) {
        toast.warn("Channel ID is required.", {
            theme: "dark",
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
        return;
      }
      if (!this.message) {
        toast.warn("Message is required.", {
            theme: "dark",
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
          });
        return;
      }
      window.discordBotAPI.sendMessageToChannel(this.channelId, this.message);
    },
  },
};
</script>