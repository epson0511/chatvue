<template>
  <div class="top">
    <app-head></app-head>
  </div>
  <div class="content">
    <router-view />
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

// .content{
//       margin: 0 0 100px;
//     /* bottom = footer height */
//     padding: 100px;
// }
</style>
