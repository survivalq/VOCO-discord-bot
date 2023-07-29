<template>
  <div class="h-screen w-screen flex">
    <!-- Sidebar -->
    <div class="md:flex flex-col w-64 h-full overflow-hidden text-gray-400 bg-[#0c070c] border-r border-[#424244]"> <!-- Modified background color here -->
      <router-link class="flex items-center w-full px-3 mt-3" to="/">
        <img src="/favicon.ico" class="h-10" alt="" />
        <span class="ml-2 text-base font-bold">VOCO-bot</span>
      </router-link>
      <div class="mt-2 p-5">
        <router-link
          v-for="(tab, index) in tabs"
          :key="index"
          :to="tab.route"
          class="flex items-center w-full sidebar-button hover:text-white p-2 rounded-lg transition duration-150 ease-out cursor-pointer"
          :class="{
            'bg-[#615876] bg-opacity-20': isTabActive(tab.route),
            'text-white': isTabActive(tab.route)
          }"
          @click.native="changeTab(index)"
        >
          <i :class="[tab.icon, 'text-lg']"></i>
          <p class="text-sm ml-2">{{ tab.label }}</p>
        </router-link>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="w-full h-full md:col-span-3 sm:overflow-auto relative z-0 text-white p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentTab: 0,
      tabs: [
        { label: "Overview", icon: 'bx bxs-home', route: '/' },
        { label: "Message", icon: 'bx bxs-message-dots', route: '/message' },
      ],
    };
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },

    isTabActive(route) {
      if (route === '/') {
        return this.$route.path === route;
      } else {
        return this.$route.path.startsWith(route);
      }
    },
  },
  watch: {
    $route(to) {
      const currentRoute = to.path;
      this.currentTab = this.tabs.findIndex((tab) => currentRoute.startsWith(tab.route));
    },
  },
};
</script>