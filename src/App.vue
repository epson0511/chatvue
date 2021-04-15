<template>
  <div class="top">
    <app-head></app-head>
  </div>
  <div class="content p-grid">
    <router-view />
    <router-view class="p-col-9 mediaroombox" name="Mediaroom"></router-view>
    <router-view class="p-col-3 chatroombox" name="Chatroom"></router-view>
  </div>
  <div class="bottom">
    <app-foot></app-foot>
  </div>
</template>
<script>
import AppHead from "@/components/AppHeader.vue";
import AppFoot from "@/components/AppFooter.vue";

export default {
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
.chatroombox {
  margin-left: 75%;
  padding-left: 0 !important;
}
.mediaroombox {
  padding-left: 0 !important;
  padding-top: 80px !important;
  padding-bottom: 20px !important;
}
// .content{
//       margin: 0 0 100px;
//     /* bottom = footer height */
//     padding: 100px;
// }
</style>
