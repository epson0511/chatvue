<template>
  <div class="container">
    <app-head></app-head>

    <div class="body">
   
        <router-view />
        <!-- <router-view class="mediaroombox" name="Mediaroom"></router-view> -->
        <!-- <router-view class="chatroombox" name="Chatroom"></router-view> -->
   
    </div>
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
  // background-color: #dfdcc9;
  // display: grid;
  /* height: 100%; */
  /* grid-template-rows: 6% 87% 7%; */
  // grid-template-rows: 48px 1fr 55px;
  height: calc(100vh - 90px);
  // display: grid;
  //  grid-template-rows: 50% 50%;
}
// .main {
//   height: calc(100vh - 120px);
//   display: grid;
//   grid-template-columns: 75% 25%;
// }
</style>
