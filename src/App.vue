<template>
  <div v-if="!isMainPage()" class="container">
    <app-head></app-head>

    <div class="body">
      <router-view />
    </div>
    <app-foot></app-foot>
  </div>
  <div v-if="isMainPage()" class="container_for_main">
    <app-head></app-head>

    <div class="body_for_main">
      <router-view />
    </div>
  </div>
</template>
<script>
import AppHead from "@/components/AppHeader.vue";
import AppFoot from "@/components/AppFooter.vue";

export default {
  data() {
    return {};
  },
  methods: {
    isMainPage: function () {
      if (this.$route.name === "mainpage") {
        return true;
      } else {
        return false;
      }
    },
  },
  components: {
    AppHead,
    AppFoot,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
// .chatroombox {
//   margin-left: 75%;
//   padding-left: 0 !important;
// }
// .mediaroombox {
//   padding-left: 0 !important;
//   padding-top: 80px !important;
//   padding-bottom: 20px !important;
// }
.container {
  display: grid;
  grid-template-rows: 70px 1fr 20px;
  height: 100vh;
}
.container_for_main {
  display: grid;
  grid-template-rows: 70px 1fr;
  height: 100vh;
}
html,
body {
  margin: 0;
  padding: 0;
}
// .main {
//   display: grid;
//   grid-template-columns: 75% 25%;
// }
.body {
  height: calc(100vh - 90px);
}
.body_for_main{
  height: calc(100vh - 90px);
}
.chat-body_for_main {
  height: calc(100vh - 70px);
}
</style>
